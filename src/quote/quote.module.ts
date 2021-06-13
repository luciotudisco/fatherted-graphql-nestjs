import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './quote.model';
import { QuoteService } from './quote.service';
import { QuoteResolver } from './quote.resolver';
import { EpisodeModule } from '../episode/episode.module';
import { CharacterModule } from '../character/character.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    EpisodeModule,
    CharacterModule,
  ],
  providers: [QuoteService, QuoteResolver],
})
export class QuoteModule {}
