import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('main')
@ApiBearerAuth()
@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Sabda Nest API' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  healthCheck(): { message: string } {
    return this.appService.healthCheck();
  }

  @Get('error')
  @ApiOperation({ summary: 'Error Check' })
  errorCheck() {
    return this.appService.errorCheck();
  }
}
