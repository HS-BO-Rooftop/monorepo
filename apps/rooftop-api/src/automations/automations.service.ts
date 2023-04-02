import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { WeatherService } from '../weather/weather.service';
import { GpioAction } from './classes/actions/gpio-action';
import {
  AutomationConfig,
  AutomationConfigDto
} from './classes/automation-config';
import { AutomationEntity } from './entities/automation.entity';
import { MQTTCacheService } from './mqtt-cache.service';

@Injectable()
export class AutomationsService {
  private readonly logger = new Logger(AutomationsService.name);
  private automationConfigs: AutomationConfig[] = [];

  constructor(
    readonly mqttCache: MQTTCacheService,
    @Inject('SENSOR_MQTT')
    readonly mqttClient: ClientProxy,
    @InjectRepository(AutomationEntity)
    private readonly automationRepository: Repository<AutomationEntity>,
    private readonly weatherService: WeatherService
  ) {
    this.automationRepository.find().then((data) => {
      data.forEach((automation) => {
        const config = this.createAutomationConfig(automation);
        this.upsertAutomation(config);
      });
      this.logger.verbose(`Loaded ${data.length} automations`);
    });
  }

  /**
   * Gets all automations
   * @param enabledOnly If only enabled automations should be returned
   * @returns The requested automations
   */
  public async getAutomations(
    enabledOnly = false
  ): Promise<AutomationConfigDto[]> {
    const data = await this.automationRepository.find();
    const jsonData = data.map((d) => JSON.parse(d.data) as AutomationConfigDto);
    return jsonData.filter((d) => !enabledOnly || d.active);
  }

  /**
   * Gets an automation by its id
   * @param id Id of the automation to get
   * @returns The automation
   */
  public async getAutomation(id: string): Promise<AutomationConfigDto> {
    const data = await this.automationRepository.findOne({
      where: {
        id,
      },
    });

    return JSON.parse(data.data) as AutomationConfigDto;
  }

  /**
   * Updates an automation and returns it and if a warning should be displayed
   * @param id Id of the automation to update
   * @param data Data of the automation to update
   * @returns The updated automation and if a warning should be displayed
   */
  public async updateAutomation(id: string, data: AutomationConfigDto) {
    const automation = await this.automationRepository.findOne({
      where: {
        id,
      },
    });

    const currentData = JSON.parse(automation.data) as AutomationConfigDto;

    // Merge the data
    data = {
      ...currentData,
      ...data,
    };

    automation.data = JSON.stringify(data);
    await this.automationRepository.save(automation);
    const config = this.createAutomationConfig(automation);
    this.upsertAutomation(config);

    const result = await this.getAutomation(id);
    this.logger.verbose(`Updated automation ${id}`);
    return {
      automation: result,
      shouldDisplayWarning: this.checkIfWarningShouldBeDisplayed(config),
    };
  }

  /**
   * Creates an automation and returns it and if a warning should be displayed
   * @param data Data of the automation to create
   * @returns The created automation and if a warning should be displayed
   */
  public async createAutomation(data: AutomationConfigDto) {
    const automation = new AutomationEntity();
    const id = v4();
    data.id = id;
    automation.id = id;
    automation.data = JSON.stringify(data);
    const savedData = await this.automationRepository.save(automation);
    const config = this.createAutomationConfig(automation);
    await this.automationRepository.save(automation);
    this.upsertAutomation(config);
    this.logger.verbose(`Created automation ${id}`);

    // If the automation has any GPIO actions, that turn on a Pin.
    // We need to check if there is a automation to turn it off, else we need to warn the user.

    const shouldDisplayWarning = this.checkIfWarningShouldBeDisplayed(config);

    return {
      automation: await this.getAutomation(savedData.id),
      shouldDisplayWarning,
    };
  }

  /**
   * Checks if a warning should be displayed or not
   * @param config config of the automation that is being created/updated
   * @returns If a warning should be displayed or not
   */
  private checkIfWarningShouldBeDisplayed(config: AutomationConfig) {
    const turnOnActions = config.actions
      .filter((a): a is GpioAction => a.type === 'gpio_action')
      .filter((a) => a.targetState === true);
    const turnOffActions = this.automationConfigs
      .filter((a) => a.id !== config.id)
      .map((a) =>
        a.actions
          .filter((a): a is GpioAction => a.type === 'gpio_action')
          .filter((a) => a.targetState === false)
      )
      .flat();

    const shouldDisplayWarning = turnOnActions.some(
      (a) => !turnOffActions.some((b) => b.boardPinName === a.boardPinName)
    );
    return shouldDisplayWarning;
  }

  /**
   * Deletes an automation
   * @param id Id of the automation to delete
   */
  public async deleteAutomation(id: string) {
    await this.automationRepository.delete({
      id,
    });

    // Dispose of the automation
    const automation = this.automationConfigs.find((a) => a.id === id);
    automation.dispose();

    this.automationConfigs = this.automationConfigs.filter((a) => a.id !== id);

    this.logger.verbose(`Deleted automation ${id}`);
  }

  /**
   * Creates an instance of AutomationConfig from an AutomationEntity
   * @param automation The automation entity to create the config from
   * @returns The created config
   */
  private createAutomationConfig(automation: AutomationEntity) {
    return AutomationConfig.deserialize(
      automation.data,
      this.weatherService,
      this.mqttCache.cache,
      this.mqttClient
    );
  }

  private async upsertAutomation(automation: AutomationConfig) {
    const index = this.automationConfigs.findIndex(
      (a) => a.id === automation.id
    );

    // Replace the object if it exists
    if (index !== -1) {
      // Delete the object
      const oldAutomation = this.automationConfigs[index];
      oldAutomation.dispose();

      this.automationConfigs[index] = automation;
    } else {
      this.automationConfigs.push(automation);
    }
  }
}
