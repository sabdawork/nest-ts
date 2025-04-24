import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongodbService } from './mongodb.service';
import { Example, ExampleSchema } from 'src/schema/example.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
        dbName: configService.get<string>('MONGO_DB') ?? 'default-db',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Example.name,
        schema: ExampleSchema,
      },
    ]),
  ],
  providers: [MongodbService],
  exports: [MongooseModule, MongodbService],
})
export class MongodbModule {}
