import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { Schema } from 'mongoose';
import { Episode } from './episode.model';
import { EpisodeService } from './episode.service';
import * as _ from 'lodash';

@Injectable({ scope: Scope.REQUEST })
export class EpisodeLoader
  implements NestDataLoader<Schema.Types.ObjectId, Episode>
{
  constructor(private readonly episodeService: EpisodeService) {}

  generateDataLoader(): DataLoader<Schema.Types.ObjectId, Episode> {
    return new DataLoader<Schema.Types.ObjectId, Episode>(
      async (keys: Schema.Types.ObjectId[]) => {
        const values = await this.episodeService.findByIds(keys);
        const episodeById = _.groupBy(values, function (value) {
          return String(value._id);
        });
        return keys.map((key) => episodeById[String(key)][0]);
      },
    );
  }
}
