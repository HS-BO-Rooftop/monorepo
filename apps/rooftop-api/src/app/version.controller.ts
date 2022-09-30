import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Version')
@Controller('version')
export class VersionController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  getVersion() {
    return {
      version: this.config.get('VERSION', 'unknown'),
    };
  }
}
