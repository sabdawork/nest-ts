import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ExampleDocument } from 'src/schema/example.schema';
import { CreateExampleDto, GetExamplesQueryDto } from './dto/example.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class ExampleService {
  private readonly exampleModel: Model<ExampleDocument>;

  constructor(private readonly mongodb: MongodbService) {
    this.exampleModel = this.mongodb.model('example');
  }

  async getExample(): Promise<ExampleDocument[]> {
    const data = await this.exampleModel.find().sort({ createdAt: -1 }).limit(2);
    return data ?? [];
  }
  async getExampleById(id: string) {
    try {
      const data = await this.exampleModel.findById(id).exec();
      if (data == null) {
        throw new NotFoundException(`Example with ID: ${id} not found`);
      }
      return { data, message: `Example get successfully for ID: ${id}` };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === 'CastError') {
        throw new BadRequestException(`ID: ${id} is invalid`);
      }
      throw error;
    }
  }

  async updateExample(id: string, body: CreateExampleDto) {
    try {
      const data = await this.exampleModel
        .findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (data == null) {
        throw new NotFoundException(`Example with ID: ${id} not found`);
      }
      return { data, message: `Example update successfully for ID: ${id}` };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === 'CastError') {
        throw new BadRequestException(`ID: ${id} is invalid`);
      }
      throw error;
    }
  }

  async deleteExample(id: string) {
    try {
      const data = await this.exampleModel.findByIdAndDelete(id).exec();
      if (data == null) {
        throw new NotFoundException(`Example with ID: ${id} not found`);
      }
      return { data, message: `Example delete successfully for ID: ${id}` };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === 'CastError') {
        throw new BadRequestException(`ID: ${id} is invalid`);
      }
      throw error;
    }
  }

  async createExample(body: CreateExampleDto) {
    const randoms = generateRandomStrings();

    const example = await new this.exampleModel({
      name: `${body.name} ${randoms}`,
      email: `${randoms}${body.email}`,
    }).save();

    return { data: example, message: 'Successfully created a new example.' };
  }

  async findExamples(query: GetExamplesQueryDto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort: any = {};
    if (query?.sort != null) {
      const [field, direction = 'asc'] = query.sort.split(':');
      sort[field] = direction === 'desc' ? -1 : 1;
    }

    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.exampleModel.find().sort(sort).skip(skip).limit(limit).exec(),
      this.exampleModel.countDocuments(),
    ]);

    return {
      data: items,
      total,
      page,
      limit,
      message: 'Successfully get example data.',
    };
  }
}

function generateRandomStrings(count = 5): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789';

  let result = '';
  for (let j = 0; j < count; j++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    result += chars[randIndex];
  }

  return result;
}
