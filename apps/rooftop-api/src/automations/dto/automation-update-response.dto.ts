import { ApiProperty } from "@nestjs/swagger";
import { AutomationConfigDto } from "../classes/automation-config";

export class AutomationUpdateResponseDto {
  @ApiProperty()
  automation: AutomationConfigDto

  @ApiProperty()
  shouldDisplayWarning: boolean;
}