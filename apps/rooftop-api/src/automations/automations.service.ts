import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationConfig, AutomationConfigDto, IAutomationConfig } from './classes/automation-config';
import { AutomationEntity } from './entities/automation.entity';
import { mqttCacheEntry, MQTTCacheService } from './mqtt-cache.service';

@Injectable()
export class AutomationsService {
  private automationConfigs: AutomationConfig[] = [];
  private previousData: mqttCacheEntry[] = [];

  constructor(
    readonly mqttCache: MQTTCacheService,
    @Inject('SENSOR_MQTT')
    readonly mqttClient: ClientProxy,
    @InjectRepository(AutomationEntity)
    private readonly automationRepository: Repository<AutomationEntity>
  ) {
    this.automationRepository.findOne({
      where: {
        id: "102fce80-59a9-4409-a701-9d2a679a403e"
      }
    }).then(data => {
      const automation = AutomationConfig.deserialize(data.data, null, mqttCache.cache, mqttClient)
      console.log(automation.toString())
      this.automationConfigs = [automation]
    })
  }

  public async getAutomations(enabledOnly = false): Promise<IAutomationConfig[]> {
    const data = await this.automationRepository.find();
    const jsonData = data.map(d => JSON.parse(d.data) as IAutomationConfig)
    return jsonData.filter(d => !enabledOnly || d.active)
  }

  public async getAutomation(id: string): Promise<IAutomationConfig> {
    const data = await this.automationRepository.findOne({
      where: {
        id
      }
    });

    return JSON.parse(data.data) as IAutomationConfig
  }

  public async updateAutomation(id: string, data: AutomationConfigDto) {
    const automation = await this.automationRepository.findOne({
      where: {
        id
      }
    });

    const currentData = JSON.parse(automation.data) as AutomationConfigDto

    // Merge the data
    data = {
      ...currentData,
      ...data
    }

    automation.data = JSON.stringify(data)
    await this.automationRepository.save(automation)
    const config = this.createAutomationConfig(automation)
    this.upsertAutomation(config)
  }

  public async createAutomation(data: AutomationConfigDto) {
    const automation = new AutomationEntity()
    automation.data = JSON.stringify(data)
    await this.automationRepository.save(automation)
    const config = this.createAutomationConfig(automation)
    this.upsertAutomation(config)
  }

  public async deleteAutomation(id: string) {
    await this.automationRepository.delete({
      id
    })

    this.automationConfigs = this.automationConfigs.filter(a => a.id !== id)
  }

  private createAutomationConfig(automation: AutomationEntity) {
    return AutomationConfig.deserialize(automation.data, null, this.mqttCache.cache, this.mqttClient)
  }

  private async upsertAutomation(automation: AutomationConfig) {
    this.automationConfigs = this.automationConfigs.filter(a => a.id !== automation.id)
    this.automationConfigs.push(automation)
  }
}
