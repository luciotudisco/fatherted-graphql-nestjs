import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Quote } from './quote.model';
import { QuoteService } from './quote.service';
import { Episode } from '../episode/episode.model';
import { Character } from '../character/character.model';
import { EpisodeLoader } from '../episode/episode.loader';
import { Schema } from 'mongoose';
import { CharacterLoader } from '../character/character.loader';

@Resolver(() => Quote)
export class QuoteResolver {
  constructor(private quoteService: QuoteService) {}

  @Query(() => [Quote])
  async quotes() {
    return this.quoteService.findAll();
  }

  @Query(() => Quote)
  async randomQuote() {
    const randomQuotes = await this.quoteService.findRandom();
    return randomQuotes[0];
  }

  @ResolveField(() => Episode)
  episode(
    @Parent() quote: Quote,
    @Loader(EpisodeLoader.name)
    episodeLoader: DataLoader<Schema.Types.ObjectId, Episode>,
  ) {
    return episodeLoader.load(quote.episode);
  }

  @ResolveField(() => [Character])
  characters(
    @Parent() quote: Quote,
    @Loader(CharacterLoader.name)
    characterLoader: DataLoader<Schema.Types.ObjectId, Character>,
  ) {
    return characterLoader.loadMany(quote.characters);
  }
}
