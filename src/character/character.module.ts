import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.model';
import { CharacterService } from './character.service';
import { CharacterResolver } from './character.resolver';
import { CharacterLoader } from './character.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  providers: [
    CharacterService,
    CharacterResolver,
    CharacterLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [CharacterLoader, CharacterService],
})
export class CharacterModule {}
