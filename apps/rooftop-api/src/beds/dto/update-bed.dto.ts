import { PartialType } from '@nestjs/swagger';
import { CreateBedDto } from './create-bed.dto';

export class UpdateBedDto extends PartialType(CreateBedDto) {}
