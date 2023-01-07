import {
  AfterViewInit,
  Component, ComponentRef, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  NavController
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, filter } from 'rxjs';
import {
  AutomationConfigDto,
  BoardConfigurationDto,
  BoardDto,
  BoardPinDto
} from '../../../api/models';
import {
  AutomationsService,
  BoardPinsService,
  BoardsService,
  ConfigurationsService
} from '../../../api/services';
import { loadingHelper, LoadingService } from '../../../loading.service';
import { ToastService } from '../../../toast.service';
import { BaseAutomationAction, BaseAutomationCondition } from './base-automation-condition';
import { CurrentWeatherValueConditionComponent } from './current-weather-value-condition/current-weather-value-condition.component';
import { GpioDurationActionComponent } from './gpio-duration-action/gpio-duration-action.component';
import { SensorValueConditionComponent } from './sensor-value-condition/sensor-value-condition.component';
import { TimeSinceLastRunConditionComponent } from './time-since-last-run-condition/time-since-last-run-condition.component';
import { TimeValueConditionComponent } from './time-value-condition/time-value-condition.component';
import { ToggleGpioActionComponent } from './toggle-gpio-action/toggle-gpio-action.component';
import { WeatherForecastValueConditionComponent } from './weather-forecast-value-condition/weather-forecast-value-condition.component';

const triggerComponentTypes = {
  sensor: SensorValueConditionComponent,
  time: TimeValueConditionComponent,
  weather: CurrentWeatherValueConditionComponent,
  time_since_last_run: TimeSinceLastRunConditionComponent,
} as const;

const conditionComponentTypes = {
  ...triggerComponentTypes,
  weather_forecast: WeatherForecastValueConditionComponent,
} as const;

const actionComponentTypes = {
  gpio: ToggleGpioActionComponent,
  gpio_duration: GpioDurationActionComponent,
} as const;

@Component({
  selector: 'rooftop-automation-settings',
  templateUrl: './automation-settings.component.html',
  styleUrls: ['./automation-settings.component.scss'],
})
export class AutomationSettingsPage implements OnInit, AfterViewInit {
  automationData = new BehaviorSubject<AutomationConfigDto | null>(null);
  boardsData = new BehaviorSubject<BoardDto[] | null>(null);
  configurationData = new BehaviorSubject<BoardConfigurationDto[] | null>(null);
  pinsData = new BehaviorSubject<BoardPinDto[] | null>(null);
  sensorsData = new BehaviorSubject<BoardConfigurationDto[] | null>(null);
  
  public automationName?: string
  public isCreating = false;

  private triggers: ComponentRef<BaseAutomationCondition>[] = [];
  private conditions: ComponentRef<BaseAutomationCondition>[] = [];
  private actions: ComponentRef<BaseAutomationAction>[] = [];

  @ViewChild('triggersContainer', { read: ViewContainerRef, static: true })
  triggersContainer?: ViewContainerRef;
  @ViewChild('conditionsContainer', { read: ViewContainerRef, static: true })
  conditionsContainer?: ViewContainerRef;
  @ViewChild('actionsContainer', { read: ViewContainerRef, static: true })
  actionsContainer?: ViewContainerRef;

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    bedId: this.fb.control<string | null>(null),
  });

  constructor(
    private readonly automationsService: AutomationsService,
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService,
    private readonly fb: FormBuilder,
    private readonly loading: LoadingService,
    private readonly toastCtrl: ToastService,
    private readonly navCtrl: NavController,
    private readonly pinsService: BoardPinsService,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly translate: TranslateService,
    private readonly boardConfigService: ConfigurationsService,
    private readonly alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.getBoards();
    this.getPins();
    this.getSensors();

    this.route.params.subscribe((params) => {
      if (params['automationId']) {
        this.getAutomation(params['automationId']);

        loadingHelper([
          this.automationData,
          this.boardsData,
          this.pinsData,
          this.sensorsData,
        ]).subscribe((loading) => (this.loading.loading = loading));
      } else {
        this.isCreating = true;
        loadingHelper([
          this.boardsData,
          this.pinsData,
          this.sensorsData,
        ]).subscribe((loading) => (this.loading.loading = loading));
      }
    });
  }

  ngAfterViewInit() {
    combineLatest([
      this.automationData,
      this.boardsData,
      this.pinsData,
      this.sensorsData,
    ])
      .pipe(
        filter(
          (
            arr
          ): arr is [
            AutomationConfigDto,
            BoardDto[],
            BoardPinDto[],
            BoardConfigurationDto[]
          ] => arr.every(Boolean)
        )
      )
      .subscribe(([automation]) => {
        console.log(automation);
        this.automationName = automation.name;
        this.createAutomationElements(automation);
      });
  }

  public async presentTriggerActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('Add new trigger'),
      buttons: [
        {
          text: this.translate.instant('Sensor value'),
          handler: () => {
            this.triggersContainer &&
              this.sensorsData.value &&
              this.boardsData.value &&
              this.createSensorValueComponent(
                this.triggersContainer,
                this.sensorsData.value,
                this.boardsData.value
              );
          },
        },
        {
          text: this.translate.instant('Time of day'),
          handler: () => {
            this.triggersContainer &&
              this.createTimeComponent(this.triggersContainer, true);
          },
        },
        {
          text: this.translate.instant('Weather'),
          handler: () => {
            this.triggersContainer &&
              this.createWeatherComponent(this.triggersContainer, false);
          },
        },
        {
          text: this.translate.instant('Time since last run'),
          handler: () => {
            this.triggersContainer &&
              this.createTimeSinceLastRunComponent(
                this.triggersContainer,
                false
              );
          },
        },
      ],
    });
    actionSheet.present();
  }

  public async presentConditionsActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('Add new condition'),
      buttons: [
        {
          text: this.translate.instant('Sensor value'),
          handler: () => {
            this.conditionsContainer &&
              this.sensorsData.value &&
              this.boardsData.value &&
              this.createSensorValueComponent(
                this.conditionsContainer,
                this.sensorsData.value,
                this.boardsData.value
              );
          },
        },
        {
          text: this.translate.instant('Time of day'),
          handler: () => {
            this.conditionsContainer &&
              this.createTimeComponent(this.conditionsContainer, true);
          },
        },
        {
          text: this.translate.instant('Weather'),
          handler: () => {
            this.conditionsContainer &&
              this.createWeatherComponent(this.conditionsContainer);
          },
        },
        {
          text: this.translate.instant('Weather forecast'),
          handler: () => {
            this.conditionsContainer &&
              this.createWeatherForecastComponent(this.conditionsContainer);
          },
        },
        {
          text: this.translate.instant('Time since last run'),
          handler: () => {
            this.conditionsContainer &&
              this.createTimeSinceLastRunComponent(
                this.conditionsContainer,
                false
              );
          },
        },
      ],
    });
    actionSheet.present();
  }

  public async presentActionsActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('Add new action'),
      buttons: [
        {
          text: this.translate.instant('Switch GPIO'),
          handler: () => {
            this.actionsContainer &&
            this.pinsData.value &&
            this.boardsData.value && 
            this.createGpioActionComponent(
              this.actionsContainer,
              this.boardsData.value,
              this.pinsData.value
            );
          },
          
        },
        {
          text: this.translate.instant('Switch GPIO for duration'),
          handler: () => {
            this.actionsContainer &&
            this.pinsData.value &&
            this.boardsData.value && 
            this.createGpioDurationActionComponent(
              this.actionsContainer,
              this.boardsData.value,
              this.pinsData.value
            );
          },
        },
      ],
    });
    actionSheet.present();
  }

  public async presentTriggersHelpAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('Triggers'),
      message: this.translate.instant(
        'Triggers are what starts the processing of an automation rule. When any of the automation’s triggers becomes true (trigger fires), the conditions, if any, will get validated and the actions will be performed.'
      ),
      buttons: ['OK'],
    });
    alert.present();
  }

  public async presentConditionsHelpAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('Conditions'),
      message: this.translate.instant(
        'Conditions are an optional part of an automation rule and can be used to prevent an action from happening when triggered. When a condition does not return true, the automation will stop executing. Conditions look very similar to triggers but are very different. A trigger will look at events happening in the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.'
      ),
      buttons: ['OK'],
    });
    alert.present();
  }

  public async presentActionsHelpAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('Actions'),
      message: this.translate.instant(
        'The action of an automation rule is what is being executed when a rule fires.'
      ),
      buttons: ['OK'],
    });
    alert.present();
  }

  private async createAutomationElements(
    automation: AutomationConfigDto
  ) {
    this.createTriggerElements(automation.triggers);
    this.createConditionElements(automation.conditions);
    this.createActionElements(automation.actions);
  }

  public createGpioActionComponent(
    container: ViewContainerRef,
    boards: BoardDto[],
    pins: BoardPinDto[],
    selectedPin?: BoardPinDto,
    selectedBoard?: BoardDto,
    target = false
  ) {
    const gpioAction = container.createComponent(
      actionComponentTypes.gpio
    );

    const instance = gpioAction.instance;
    instance.boards = boards;
    instance.pins = pins;
    instance.targetValue = target;
    instance.selectedPin = selectedPin;
    instance.selectedBoard = selectedBoard;

    this.addComponentRefToArray(container, gpioAction);

    return gpioAction;
  }

  public createGpioDurationActionComponent(
    container: ViewContainerRef,
    boards: BoardDto[],
    pins: BoardPinDto[],
    selectedPin?: BoardPinDto,
    selectedBoard?: BoardDto,
    target = false,
    duration = 60
  ) {
    const gpioAction = container.createComponent(
      actionComponentTypes.gpio_duration
    );

    const instance = gpioAction.instance;
    instance.boards = boards;
    instance.pins = pins;
    instance.targetValue = target;
    instance.selectedPin = selectedPin;
    instance.selectedBoard = selectedBoard;
    instance.duration = duration;

    this.addComponentRefToArray(container, gpioAction);

    return gpioAction;
  }

  public createTimeComponent(
    container: ViewContainerRef,
    isTrigger: boolean,
    targetValue?: Date
  ) {
    const timeTrigger = container.createComponent(triggerComponentTypes.time);
    const instance = timeTrigger.instance;
    instance.isTrigger = isTrigger;
    instance.selectedOperator = 'eq';
    const hours = targetValue ? targetValue.getHours() : 12;
    const minutes = targetValue ? targetValue.getMinutes() : 0;
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    instance.selectedValue = formatted;

    this.addComponentRefToArray(container, timeTrigger);

    return timeTrigger;
  }

  public createTimeSinceLastRunComponent(
    container: ViewContainerRef,
    isTrigger: boolean,
    targetValue = 0
  ) {
    const timeTrigger = container.createComponent(
      triggerComponentTypes.time_since_last_run
    );
    const instance = timeTrigger.instance;
    instance.isTrigger = isTrigger;
    instance.selectedOperator = 'eq';
    instance.selectedValue = targetValue;

    this.addComponentRefToArray(container, timeTrigger);

    return timeTrigger;
  }

  public createWeatherComponent(
    container: ViewContainerRef,
    target: CurrentWeatherValueConditionComponent['isRainy'] = false
  ) {
    const weatherTrigger = container.createComponent(
      triggerComponentTypes.weather
    );
    const instance = weatherTrigger.instance;
    instance.isRainy = target;

    this.addComponentRefToArray(container, weatherTrigger);

    return weatherTrigger;
  }

  public createWeatherForecastComponent(container: ViewContainerRef, target: WeatherForecastValueConditionComponent['isRainy'] = false, look_ahead = 120) {
    const weatherTrigger = container.createComponent(conditionComponentTypes.weather_forecast);
    const instance = weatherTrigger.instance;
    instance.isRainy = target;
    instance.duration = look_ahead;

    this.addComponentRefToArray(container, weatherTrigger);

    return weatherTrigger;
  }

  public createSensorValueComponent(
    container: ViewContainerRef,
    sensors: BoardConfigurationDto[],
    boards: BoardDto[],
    target: SensorValueConditionComponent['selectedValue'] = null,
    operator: SensorValueConditionComponent['selectedOperator'] = null,
    sensorId: string | null = null
  ) {
    const sensorTrigger = container.createComponent(
      triggerComponentTypes.sensor
    );
    const instance = sensorTrigger.instance;
    instance.sensors = sensors;
    instance.boards = boards;

    const sensor = sensors.find((sensor) => sensor.id === sensorId);
    if (sensor) {
      instance.selectedBoard =
        boards.find((board) => board.id === sensor.board.id) ?? null;
    }

    // Set the values
    instance.selectedSensor =
      sensors.find((sensor) => sensor.id === sensorId) ?? null;
    instance.selectedValue = target;
    instance.selectedOperator = operator;
    if (instance.selectedBoard) {
      instance.onBoardChange(instance.selectedBoard);
    }

    this.addComponentRefToArray(container, sensorTrigger);

    return sensorTrigger;
  }

  private addComponentRefToArray(container: ViewContainerRef, ref: ComponentRef<BaseAutomationCondition>) {
    if (container === this.triggersContainer) {
      this.triggers.push(ref);
      console.log('Added component ref to triggers', this.triggers);
    } else if (container === this.conditionsContainer) {
      this.conditions.push(ref);
      console.log('Added component ref to conditions', this.conditions);
    }
    else if (container === this.actionsContainer) {
      this.actions.push(ref);
      console.log('Added component ref to actions', this.actions);
    }

  }

  private async createElementFromJson(container: ViewContainerRef, jsonData: any, isTrigger = false)
  {
    if (!this.sensorsData.value)
    {
      throw new Error('Could not find sensors');
    }

    if (!this.boardsData.value)
    {
      throw new Error('Could not find boards');
    }

    if (!this.pinsData.value)
    {
      throw new Error('Could not find pins');
    }

      // Create the component
      switch (jsonData.type) {
        case 'weather': {
          // If lookaheadminutes is set, it's a forecast condition
          if (jsonData.lookaheadminutes) {
            this.createWeatherForecastComponent(
              container,
              jsonData.target as boolean,
              jsonData.lookaheadminutes as number
            );
          }
          else {
            this.createWeatherComponent(
              container,
              jsonData.target as boolean
            );
          }
        }
        break;
        case 'time': {
          const date = new Date(jsonData.target);
          
          this.createTimeComponent(
            container,
            isTrigger,
            date
          );
        }
        break;
        case 'time_since_last_run': {
          this.createTimeSinceLastRunComponent(
            container,
            isTrigger,
            jsonData.target as number
          );
        }
        break;
        case 'sensor':
          {
            this.createSensorValueComponent(
              container,
              this.sensorsData.value,
              this.boardsData.value,
              jsonData.target as number,
              jsonData.operator as string,
              jsonData.sensorId as string
            );
          }
          break;
        case 'gpio_action': {
          const selectedPin = this.pinsData.value.find(
            (pin) => pin.pin === jsonData.pinId
          );

          const selectedBoard = this.boardsData.value.find(
            (board) => board.id === jsonData.boardId
          );

          this.createGpioActionComponent(
            container,
            this.boardsData.value,
            this.pinsData.value,
            selectedPin,
            selectedBoard,
            jsonData.newState as boolean
          );
        }
        break;
        default:
          throw new Error('Unknown type: ' + jsonData.type);
    }
  }
  
  private async createTriggerElements(
    triggers: AutomationConfigDto['triggers']
  ) {
    if (!this.triggersContainer) {
      throw new Error('Could not find triggers container');
    }

    for (const trigger of triggers) {
      this.createElementFromJson(this.triggersContainer, trigger, true);
    }
  }

  private async createConditionElements(
    conditions: AutomationConfigDto['conditions']
  ) {
    if (!this.conditionsContainer) {
      throw new Error('Could not find conditions container');
    }

    for (const condition of conditions) {
      this.createElementFromJson(this.conditionsContainer, condition, false);
    }
  }

  private async createActionElements(actions: AutomationConfigDto['actions']) {
    if (!this.actionsContainer) {
      throw new Error('Could not find actions container');
    }

    for (const action of actions) {
      this.createElementFromJson(this.actionsContainer, action, false);
    }
  }

  private async getSensors() {
    this.boardConfigService.configurationsControllerFindAll().subscribe({
      next: (sensors) => {
        this.sensorsData.next(sensors);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  private async getAutomation(id: string) {
    this.automationsService.getAutomation({ id }).subscribe({
      next: (automation) => {
        this.automationData.next(automation);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  private async getBoards() {
    this.boardsService.findAllBoards().subscribe({
      next: (boards) => {
        this.boardsData.next(boards);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  private async getPins() {
    this.pinsService.findAllBoardPins().subscribe({
      next: (pins) => {
        this.pinsData.next(pins);
      },
      error: (error) => {
        this.loading.loading = false;
        console.error(error);
        this.toastCtrl.present('Error loading data', 'danger');
      },
    });
  }

  async save() {
    if (!this.automationName) {
      this.toastCtrl.present(this.translate.instant('Please enter a name'), 'danger');
      return;
    }

    const triggers = this.triggers.map((trigger) => trigger.instance.toJson());
    const conditions = this.conditions.map((condition) => condition.instance.toJson());
    const actions = this.actions.map((action) => action.instance.toJson());

    const automation = {} as AutomationConfigDto;
    if (this.automationData.value) {
      automation.id = this.automationData.value.id;
    }

    automation.triggers = triggers;
    automation.conditions = conditions;
    automation.actions = actions;
    automation.name = this.automationName;

    if (automation.id) {
      // Update
      this.automationsService.updateAutomation({
        body: automation,
        id: automation.id,
      }).subscribe({
        next: () => {
          this.toastCtrl.present(this.translate.instant('Automation updated'), 'success');
          this.navigateBack();
        },
        error: (error) => {
          console.error(error);
          this.toastCtrl.present('Error updating automation', 'danger');
        }
      });
    } else {
      // Create
      automation.active = true;
      this.automationsService.createAutomation({ body: automation }).subscribe({
        next: () => {
          this.toastCtrl.present(this.translate.instant('Automation created'), 'success');
          this.navigateBack();
        },
        error: (error) => {
          console.error(error);
          this.toastCtrl.present('Error creating automation', 'danger');
        }
      });
    }
  }

  private navigateBack() {
    this.navCtrl.navigateBack('settings/automations');
  }
}
