import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Episode } from './episode.model';
import { EpisodeService } from './episode.service';
import { Series } from '../series/series.model';
import { SeriesLoader } from '../series/series.loader';
import { Schema } from 'mongoose';

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private episodeService: EpisodeService) {}

  @Query(() => [Episode])
  async episodes() {
    return this.episodeService.findAll();
  }

  @ResolveField(() => Series)
  series(
    @Parent() episode: Episode,
    @Loader(SeriesLoader.name)
    seriesLoader: DataLoader<Schema.Types.ObjectId, Series>,
  ) {
    return seriesLoader.load(episode.series);
  }
}
