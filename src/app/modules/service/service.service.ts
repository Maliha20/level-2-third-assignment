import { TService } from './service.interface';
import { Service } from './service.model';

const createCarServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServicesFromDb = async () => {
  const result = await Service.find();
  return result;
};
const getAServiceFromDb = async (id: string) => {
  const result = await Service.findById({ _id: id });
  return result;
};
const updateServiceIntoDb = async (id: string, payload: Partial<TService>) => {

  const result = await Service.findByIdAndUpdate({ _id: id },
    payload,
    { new: true });
  return result;
};

export const carServiceServices = {
  createCarServiceIntoDb,
  getAllServicesFromDb,
  getAServiceFromDb,
  updateServiceIntoDb
};
