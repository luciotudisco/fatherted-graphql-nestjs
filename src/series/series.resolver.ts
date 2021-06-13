import { Resolver, Query } from '@nestjs/graphql';
import { Series } from './series.model';
import { SeriesService } from './series.service';

@Resolver(() => Series)
export class SeriesResolver {
  constructor(private seriesService: SeriesService) {}

  @Query(() => [Series])
  async series() {
    return this.seriesService.findAll();
  }
}
