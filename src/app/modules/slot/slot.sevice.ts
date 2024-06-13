import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlotsIntoDb = async (payload: TSlot) => {

  const {service} = payload
 
  const serviceDuration = await Service.findById(service);
  console.log('service time:', serviceDuration);

  const result = await Slot.create(payload);
  return result;
};

export const slotServices = {
  createSlotsIntoDb,
};
