import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Series, SeriesDocument } from './series.model';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<SeriesDocument>,
  ) {}

  findById(id: Schema.Types.ObjectId) {
    return this.seriesModel.findById(id);
  }

  findAll() {
    return this.seriesModel.find().exec();
  }
}
