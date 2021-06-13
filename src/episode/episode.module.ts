import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './episode.model';
import { EpisodeService } from './episode.service';
import { EpisodeResolver } from './episode.resolver';
import { SeriesModule } from '../series/series.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
    SeriesModule,
  ],
  providers: [EpisodeService, EpisodeResolver],
  exports: [EpisodeService],
})
export class EpisodeModule {}
