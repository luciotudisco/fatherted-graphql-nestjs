import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Episode } from './episode.model';
import { EpisodeService } from './episode.service';
import { SeriesService } from '../series/series.service';
import { Series } from '../series/series.model';

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(
    private episodeService: EpisodeService,
    private seriesService: SeriesService,
  ) {}

  @Query(() => [Episode])
  async episodes() {
    return this.episodeService.findAll();
  }

  @ResolveField(() => Series)
  series(@Parent() episode: Episode) {
    return this.seriesService.findById(episode.series);
  }
}
