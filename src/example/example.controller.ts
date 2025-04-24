import { ExampleService } from './example.service';
import { Body, Controller, Get, Param, Post, Query, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { MongoIdDto } from 'src/dto/common.dto';
import { CreateExampleDto, GetExamplesQueryDto } from './dto/example.dto';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 10, ttl: 10000 } })
@Controller('example')
@ApiBearerAuth()
@ApiTags('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all examples' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findExamples(@Query() query: GetExamplesQueryDto) {
    return this.exampleService.findExamples(query);
  }

  @Post('')
  @ApiOperation({ summary: 'Create example' })
  createExample(@Body() body: CreateExampleDto) {
    return this.exampleService.createExample(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get example by ID' })
  @ApiParam({ name: 'id', type: String, example: '645cb1f3a0b6efeb8c2f2a42' })
  getExampleById(@Param() params: MongoIdDto) {
    return this.exampleService.getExampleById(params.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update example by ID' })
  @ApiParam({ name: 'id', type: String, example: '645cb1f3a0b6efeb8c2f2a42' })
  updateExample(@Param() params: MongoIdDto, @Body() body: CreateExampleDto) {
    return this.exampleService.updateExample(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete example by ID' })
  @ApiParam({ name: 'id', type: String, example: '645cb1f3a0b6efeb8c2f2a42' })
  deleteExample(@Param() params: MongoIdDto) {
    return this.exampleService.deleteExample(params.id);
  }
}
