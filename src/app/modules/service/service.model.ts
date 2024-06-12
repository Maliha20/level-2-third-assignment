import { Schema, model } from 'mongoose';
import { TService } from './service.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const serviceSchema = new Schema<TService>(
  {
    name: { type: String, trim: true, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true,
    versionKey: false },
);


serviceSchema.pre('save', async function (next) {
    const doesServiceExist = await Service.findOne({
      name: this.name,
    });
    if (doesServiceExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Service already exists!');
    }
    next();
  });

export const Service = model<TService>('Service', serviceSchema);
