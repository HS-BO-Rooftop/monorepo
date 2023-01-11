import { ClientProxy } from '@nestjs/microservices';
import { ApiProperty } from '@nestjs/swagger';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { WeatherService } from '../../weather/weather.service';
import { mqttCacheEntry } from '../mqtt-cache.service';
import { ActionFactory } from './actions/action-factory';
import { ActionJsonData, IAction } from './actions/IAction';
import { EvaluatorFactory } from './EvaluatorFactory';
import { EvaluatorJsonData, IEvaluator } from './IEvaluator';
import { ISerializeable } from './ISerializeable';

export class AutomationConfig implements ISerializeable{
  public set triggers(triggers: IEvaluator[]) {
    this._triggers.next(triggers);
  }

  public get triggers() {
    return this._triggers.value;
  }

  public set conditions(conditions: IEvaluator[]) {
    this._conditions.next(conditions);
  }

  public set actions(actions: IAction[]) {
    this._actions.next(actions);
  }

  public get actions(): IAction[] {
    return this._actions.value;
  }

  public lastRun = new BehaviorSubject<Date | null>(null);

  public active = true;

  private _triggers = new BehaviorSubject<IEvaluator[]>([]);
  private _conditions = new BehaviorSubject<IEvaluator[]>([]);
  private _actions = new BehaviorSubject<IAction[]>([]);

  private _triggersMet = new BehaviorSubject<boolean>(false);
  private _conditionsMet = new BehaviorSubject<boolean>(false);

  private onHold = false;

  public get id(): string {
    return this._id;
  }

  constructor(private _id: string = uuidv4(), private _name = '') {
    // Subscribe to all triggers

    this._triggers
    // Only check if automation is active
      .subscribe((triggers) => {
      // Subscribe to all triggers
      combineLatest(
        triggers.map((trigger) => trigger.isFullfilled)
      ).subscribe((results) => {
        if (!this.active) {
          return;
        }
        const triggersMet = results.some((result) => result);
        this._triggersMet.next(triggersMet);
      });
    });

    // Subscribe to triggers and check conditions if triggers are met
    // If conditions are met, perform actions
    // Then ignore triggers until they are not met anymore
    this._triggersMet.subscribe(async (triggersMet) => {
      if (triggersMet && !this.onHold) {
        // Check if all conditions are met
        if (this._conditions.value.length === 0) {
          this.performActions();
        } else {
          const conditionsMet = await firstValueFrom(
            combineLatest(
              this._conditions.value.map((condition) => condition.isFullfilled)
            ).pipe(map((results) => results.every((result) => result))
          ));
          if (conditionsMet) {
            this.performActions();
          }
        }
      } else if (!triggersMet) {
        this.onHold = false;
      }
    });
  }

  private performActions() {
    this.onHold = true;
    this._actions.value.forEach((action) => action.performAction());
    this.lastRun.next(new Date());
  }

  serialize(): string {
    return JSON.stringify({
      id: this._id,
      active: true,
      name: this._name,
      triggers: this._triggers.value.map((trigger) => JSON.parse(trigger.serialize())),
      conditions: this._conditions.value.map((condition) => JSON.parse(condition.serialize())),
      actions: this._actions.value.map((action) => JSON.parse(action.serialize())),
    });
  }

  public static deserialize(json: string, weatherService: WeatherService, mqttCache: Observable<mqttCacheEntry[]>, mqttClientProxy: ClientProxy): AutomationConfig {
    const data: IAutomationConfig = JSON.parse(json);
    const automationConfig = new AutomationConfig(data.id, data.name);
    automationConfig._triggers.next(data.triggers.map((trigger) => EvaluatorFactory.deserialize(trigger, weatherService, automationConfig.lastRun, mqttCache)));
    automationConfig._conditions.next(data.conditions.map((condition) => EvaluatorFactory.deserialize(condition, weatherService, automationConfig.lastRun, mqttCache)));
    automationConfig._actions.next(data.actions.map((action) => ActionFactory.deserialize(action, mqttClientProxy)));
    automationConfig.active = data.active;

    return automationConfig;
  }

  public toString(): string {
    return `AutomationConfig: ${this._id}, ${this._name}`;
  }
}

export class AutomationConfigDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ type: [EvaluatorJsonData] })
  triggers: EvaluatorJsonData[];

  @ApiProperty({ type: [EvaluatorJsonData] })
  conditions: EvaluatorJsonData[];

  @ApiProperty({ type: [ActionJsonData]})
  actions: ActionJsonData[];
}


export class IAutomationConfig {
  id: string;
  name: string;
  active: boolean;
  triggers: IEvaluator[];
  conditions: IEvaluator[];
  actions: IAction[];
}