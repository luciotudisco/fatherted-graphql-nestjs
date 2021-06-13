import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from './series/series.module';
import { join } from 'path';
import { CharacterModule } from './character/character.module';
import { EpisodeModule } from './episode/episode.module';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: process.env.ENV === 'prod' ? true : join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      debug: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
    SeriesModule,
    EpisodeModule,
    CharacterModule,
    QuoteModule,
  ],
})
export class AppModule {}
