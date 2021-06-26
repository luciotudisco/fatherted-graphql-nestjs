import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from './series/series.module';
import { join } from 'path';
import { CharacterModule } from './character/character.module';
import { EpisodeModule } from './episode/episode.module';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.ENV === 'prod'
          ? true
          : join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      debug: true,
      path: '/',
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/documentation'
    }),
    SeriesModule,
    EpisodeModule,
    CharacterModule,
    QuoteModule,
  ],
})
export class AppModule {}
