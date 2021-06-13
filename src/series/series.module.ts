import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Series, SeriesSchema } from './series.model';
import { SeriesService } from './series.service';
import { SeriesResolver } from './series.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  providers: [SeriesService, SeriesResolver],
  exports: [SeriesService],
})
export class SeriesModule {}
