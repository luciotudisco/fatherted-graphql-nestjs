import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from '../src/series/series.module';
import { CharacterModule } from '../src/character/character.module';
import { QuoteModule } from '../src/quote/quote.module';
import { EpisodeModule } from '../src/episode/episode.module';
import { ConfigModule } from '@nestjs/config';

describe('E2E Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          path: '/',
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('query characters', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        operationName: null,
        query: `query {
                    characters {
                        _id
                        name
                    }
                }`,
      })
      .expect(200);
  });
  it('query series', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        operationName: null,
        query: `query {
                        series {
                            _id
                            name
                            premiere
                            finale
                        }
                    }`,
      })
      .expect(200);
  });
  it('query episodes', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        operationName: null,
        query: `query {
                        episodes {
                            _id
                            name
                            synopsis
                            series {
                                name
                            }
                        }
                    }`,
      })
      .expect(200);
  });

  it('query random quote', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        operationName: null,
        query: `query {
                        randomQuote {
                            _id
                            lines
                            characters {
                                name
                            }
                            episode {
                                name
                            }
                        }
                    }`,
      })
      .expect(200);
  });
});
