import { PartialType } from '@nestjs/swagger';
import { CreateBoardSensorDto } from './create-configuration.dto';

export class UpdateConfigurationDto extends PartialType(CreateBoardSensorDto) {}
