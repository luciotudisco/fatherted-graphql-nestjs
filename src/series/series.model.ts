import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Series {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Date)
  @Prop()
  premiere: Date;

  @Field(() => Date)
  @Prop()
  finale: Date;
}

export type SeriesDocument = Series & Document;

export const SeriesSchema = SchemaFactory.createForClass(Series);
