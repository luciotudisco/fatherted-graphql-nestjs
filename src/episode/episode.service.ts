import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Episode, EpisodeDocument } from './episode.model';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode.name)
    private episodeModel: Model<EpisodeDocument>,
  ) {}

  findById(id: Schema.Types.ObjectId) {
    return this.episodeModel.findById(id).exec();
  }

  findByIds(ids: Schema.Types.ObjectId[]) {
    return this.episodeModel.find({ _id: { $in: ids } }).exec();
  }

  findAll() {
    return this.episodeModel.find().exec();
  }
}
