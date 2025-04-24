import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ExampleDocument = HydratedDocument<Example>;
@Schema({ timestamps: true })
export class Example {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
