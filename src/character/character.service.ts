import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Character, CharacterDocument } from './character.model';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  findById(id: Schema.Types.ObjectId) {
    return this.characterModel.findById(id).exec();
  }

  findByIds(ids: Schema.Types.ObjectId[]) {
    return this.characterModel.find({ _id: { $in: ids } }).exec();
  }

  findAll() {
    return this.characterModel.find().exec();
  }
}
