import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AutomationConfig, AutomationConfigDto } from './classes/automation-config';
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
    private readonly automationRepository: Repository<AutomationEntity>
  ) {
    this.automationRepository.find().then(data => {
      this.automationConfigs = data.map(d => this.createAutomationConfig(d))
    });
  }

  public async getAutomations(enabledOnly = false): Promise<AutomationConfigDto[]> {
    const data = await this.automationRepository.find();
    const jsonData = data.map(d => JSON.parse(d.data) as AutomationConfigDto)
    return jsonData.filter(d => !enabledOnly || d.active)
  }

  public async getAutomation(id: string): Promise<AutomationConfigDto> {
    const data = await this.automationRepository.findOne({
      where: {
        id
      }
    });

    return JSON.parse(data.data) as AutomationConfigDto
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

    return await this.getAutomation(id);
  }

  public async createAutomation(data: AutomationConfigDto) {
    const automation = new AutomationEntity()
    const id = v4();
    data.id = id;
    automation.id = id;
    automation.data = JSON.stringify(data)
    const savedData = await this.automationRepository.save(automation)
    const config = this.createAutomationConfig(automation)
    await this.automationRepository.save(automation)
    this.upsertAutomation(config)

    return await this.getAutomation(savedData.id);
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
