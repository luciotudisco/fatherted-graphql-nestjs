import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from './quote.model';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private quoteModel: Model<QuoteDocument>,
  ) {}

  findAll() {
    return this.quoteModel.find().exec();
  }

  findRandom() {
    return this.quoteModel.aggregate([{ $sample: { size: 1 } }]).exec();
  }
}
