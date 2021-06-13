import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Series } from '../series/series.model';

@ObjectType()
@Schema()
export class Episode {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  synopsis: string;

  @Field(() => Series)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Series.name })
  series: MongooseSchema.Types.ObjectId;

  @Field(() => Date)
  @Prop()
  date: Date;
}

export type EpisodeDocument = Episode & Document;

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
