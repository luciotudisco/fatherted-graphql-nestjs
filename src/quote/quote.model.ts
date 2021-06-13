import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Episode } from '../episode/episode.model';
import { Character } from '../character/character.model';

@ObjectType()
@Schema()
export class Quote {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Episode)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Episode.name })
  episode: MongooseSchema.Types.ObjectId;

  @Field(() => [Character])
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Episode.name })
  characters: MongooseSchema.Types.ObjectId[];

  @Field(() => [String])
  @Prop()
  lines: string[];
}

export type QuoteDocument = Quote & Document;

export const QuoteSchema = SchemaFactory.createForClass(Quote);
