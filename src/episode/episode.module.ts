import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './episode.model';
import { EpisodeService } from './episode.service';
import { EpisodeResolver } from './episode.resolver';
import { SeriesModule } from '../series/series.module';
import { EpisodeLoader } from './episode.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
    SeriesModule,
  ],
  providers: [
    EpisodeService,
    EpisodeResolver,
    EpisodeLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [EpisodeLoader, EpisodeService],
})
export class EpisodeModule {}
