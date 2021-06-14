import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './series.model';
import { SeriesService } from './series.service';
import { SeriesResolver } from './series.resolver';
import { SeriesLoader } from './series.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  providers: [
    SeriesService,
    SeriesResolver,
    SeriesLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [SeriesLoader, SeriesService],
})
export class SeriesModule {}
