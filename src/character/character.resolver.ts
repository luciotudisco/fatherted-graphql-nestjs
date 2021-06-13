import { Resolver, Query } from '@nestjs/graphql';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => [Character])
  async characters() {
    return this.characterService.findAll();
  }
}
