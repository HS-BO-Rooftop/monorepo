import { PartialType } from '@nestjs/swagger';
import { CreateSensorConfigurationDto } from './create-sensor-configuration.dto';

export class UpdateSensorDto extends PartialType(
  CreateSensorConfigurationDto
) {}
