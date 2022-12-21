import { ClientProxy } from '@nestjs/microservices';
import { ApiProperty } from '@nestjs/swagger';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
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

  public set conditions(conditions: IEvaluator[]) {
    this._conditions.next(conditions);
  }

  public set actions(actions: IAction[]) {
    this._actions.next(actions);
  }

  public lastRun = new BehaviorSubject<Date | null>(null);

  private _triggers = new BehaviorSubject<IEvaluator[]>([]);
  private _conditions = new BehaviorSubject<IEvaluator[]>([]);
  private _actions = new BehaviorSubject<IAction[]>([]);

  private _triggersMet = new BehaviorSubject<boolean>(false);
  private _conditionsMet = new BehaviorSubject<boolean>(false);

  public get id(): string {
    return this._id;
  }

  constructor(private _id: string = uuidv4()) {
    // Subscribe to all triggers

    this._triggers.subscribe((triggers) => {
      // Subscribe to all triggers
      combineLatest(
        triggers.map((trigger) => trigger.isFullfilled)
      ).subscribe((results) => {
        const triggersMet = results.some((result) => result);
        this._triggersMet.next(triggersMet);
      });
    });

    // Subscribe to all conditions
    this._conditions.subscribe((conditions) => {
      // Subscribe to all conditions
      combineLatest(
        conditions.map((condition) => condition.isFullfilled)
      ).subscribe((results) => {
        const conditionsMet = results.every((result) => result);
        this._conditionsMet.next(conditionsMet);
      }
      );
    });

    // Subscribe to triggers and check conditions if triggers are met
    // If conditions are met, perform actions
    this._triggersMet.subscribe((triggersMet) => {
      if (triggersMet && this._conditionsMet.value) {
        this.performActions();
      }
    });
  }

  private performActions() {
    this._actions.value.forEach((action) => action.performAction());
    this.lastRun.next(new Date());
  }

  serialize(): string {
    return JSON.stringify({
      id: this._id,
      active: true,
      triggers: this._triggers.value.map((trigger) => JSON.parse(trigger.serialize())),
      conditions: this._conditions.value.map((condition) => JSON.parse(condition.serialize())),
      actions: this._actions.value.map((action) => JSON.parse(action.serialize())),
    });
  }

  public static deserialize(json: string, weatherService: WeatherService, mqttCache: Observable<mqttCacheEntry[]>, mqttClientProxy: ClientProxy): AutomationConfig {
    const data: IAutomationConfig = JSON.parse(json);
    const automationConfig = new AutomationConfig(data.id);
    automationConfig._triggers.next(data.triggers.map((trigger) => EvaluatorFactory.deserialize(trigger, weatherService, automationConfig.lastRun, mqttCache)));
    automationConfig._conditions.next(data.conditions.map((condition) => EvaluatorFactory.deserialize(condition, weatherService, automationConfig.lastRun, mqttCache)));
    automationConfig._actions.next(data.actions.map((action) => ActionFactory.deserialize(action, mqttClientProxy)));
    return automationConfig;
  }

  public toString(): string {
    return `AutomationConfig: ${this._id}`;
  }
}

export class AutomationConfigDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  triggers: EvaluatorJsonData[];

  @ApiProperty()
  conditions: EvaluatorJsonData[];

  @ApiProperty()
  actions: ActionJsonData[];
}


export interface IAutomationConfig {
  id: string;
  active: boolean;
  triggers: IEvaluator[];
  conditions: IEvaluator[];
  actions: IAction[];
}