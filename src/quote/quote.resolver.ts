import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Quote } from './quote.model';
import { CharacterService } from 'src/character/character.service';
import { EpisodeService } from 'src/episode/episode.service';
import { QuoteService } from './quote.service';
import { Episode } from 'src/episode/episode.model';
import { Character } from 'src/character/character.model';

@Resolver(() => Quote)
export class QuoteResolver {
  constructor(
    private quoteService: QuoteService,
    private episodeService: EpisodeService,
    private characterService: CharacterService,
  ) {}

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
  episode(@Parent() quote: Quote) {
    return this.episodeService.findById(quote.episode);
  }

  @ResolveField(() => [Character])
  characters(@Parent() quote: Quote) {
    return this.characterService.findByIds(quote.characters);
  }
}
