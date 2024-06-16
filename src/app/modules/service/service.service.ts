import { TService } from './service.interface';
import { Service } from './service.model';

const createCarServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServicesFromDb = async () => {
  const result = await Service.find({isDeleted: 'false'});
  return result;

 
};
const getAServiceFromDb = async (id: string) => {
  const result = await Service.findById( id );
  return result;
};
const updateServiceIntoDb = async (id: string, payload: Partial<TService>) => {

  const result = await Service.findByIdAndUpdate(id  ,
    payload,
    { new: true });
  return result;
};
const deleteServiceFromDb = async (id: string) => {

  const result = await Service.findByIdAndUpdate(
    id,
    {isDeleted: true , new: true });
  return result;
};

export const carServiceServices = {
  createCarServiceIntoDb,
  getAllServicesFromDb,
  getAServiceFromDb,
  updateServiceIntoDb,
  deleteServiceFromDb
};
