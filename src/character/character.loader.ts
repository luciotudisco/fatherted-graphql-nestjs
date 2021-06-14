import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { Schema } from 'mongoose';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import * as _ from 'lodash';

@Injectable({ scope: Scope.REQUEST })
export class CharacterLoader
  implements NestDataLoader<Schema.Types.ObjectId, Character>
{
  constructor(private readonly characterService: CharacterService) {}

  generateDataLoader(): DataLoader<Schema.Types.ObjectId, Character> {
    return new DataLoader<Schema.Types.ObjectId, Character>(
      async (keys: Schema.Types.ObjectId[]) => {
        const values = await this.characterService.findByIds(keys);
        const characterById = _.groupBy(values, function (value) {
          return String(value._id);
        });
        return keys.map((key) => characterById[String(key)][0]);
      },
    );
  }
}
