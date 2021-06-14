import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { Schema } from 'mongoose';
import { Series } from './series.model';
import { SeriesService } from './series.service';
import * as _ from 'lodash';

@Injectable({ scope: Scope.REQUEST })
export class SeriesLoader
  implements NestDataLoader<Schema.Types.ObjectId, Series>
{
  constructor(private readonly seriesService: SeriesService) {}

  generateDataLoader(): DataLoader<Schema.Types.ObjectId, Series> {
    return new DataLoader<Schema.Types.ObjectId, Series>(
      async (keys: Schema.Types.ObjectId[]) => {
        const values = await this.seriesService.findByIds(keys);
        const seriesById = _.groupBy(values, function (value) {
          return String(value._id);
        });
        return keys.map((key) => seriesById[String(key)][0]);
      },
    );
  }
}
