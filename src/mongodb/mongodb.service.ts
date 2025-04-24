import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExampleDocument, Example } from 'src/schema/example.schema';

export interface Models {
  example: Model<ExampleDocument>;
}

@Injectable()
export class MongodbService {
  private readonly mongodb: Models;

  constructor(@InjectModel(Example.name) private readonly exampleModel: Model<ExampleDocument>) {
    this.mongodb = {
      example: this.exampleModel,
    };
  }

  public model<K extends keyof Models>(modelName: K): Models[K] {
    return this.mongodb[modelName];
  }
}
