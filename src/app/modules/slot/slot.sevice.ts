import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { convertMinutesIntoHour, doesSlotConflict } from './slot.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { slotSearchableFields } from './slot.constant';

const createSlotsIntoDb = async (payload: TSlot) => {
  const { service, date, startTime, endTime } = payload;

  // checking if the service exists in the payload

  const doesServiceExist = await Service.findById(service);

  if (!doesServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Services does not exist');
  }

  const serviceDuration = doesServiceExist?.duration;

  const hourStartIntoMinutes =
    parseInt(startTime.split(':')[0], 10) * 60 +
    parseInt(startTime.split(':')[1], 10);

  const hourEndIntoMinutes =
    parseInt(endTime.split(':')[0], 10) * 60 +
    parseInt(endTime.split(':')[1], 10);

  const totalDuration = hourEndIntoMinutes - hourStartIntoMinutes;
  const numberOfSlots = totalDuration / serviceDuration;

  // console.log({serviceDuration, hourStartIntoMinutes,hourEndIntoMinutes,totalDuration,numberOfSlots});

  //generate intervals
  const slots = [];
  // assigning the startTime to a let variable and looping through the number of slots

  let currentStartTime = hourStartIntoMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const currentEndTime = currentStartTime + serviceDuration;

    slots.push({
      slot: i + 1,
      currentStartTime: convertMinutesIntoHour(currentStartTime),
      currentEndTime: convertMinutesIntoHour(currentEndTime),
    });
    currentStartTime = currentEndTime;
  }

  const existingSlot = await Slot.find({
    service,
    date: { $in: date },
  }).select('date startTime endTime');

  const newSlot = {
    date,
    startTime,
    endTime,
  };
  console.log(existingSlot, newSlot);
  //checking for time conf
  if (doesSlotConflict(existingSlot, newSlot)) {
    throw new AppError(httpStatus.CONFLICT, 'This slot is not available');
  }

  const createSlotsIntervals = [];
  for (const slot of slots) {
    const newSlotData = {
      service,
      date,
      startTime: slot.currentStartTime,
      endTime: slot.currentEndTime,
    };

    const result = await Slot.create(newSlotData);
    createSlotsIntervals.push(result);
  }
  return createSlotsIntervals;
};

//retriving the available slots

const getAllAvailableSlotsFromDb = async (query: Record<string, unknown>) => {
  const availableSlots = await Slot.find({
    isBooked: { $in: ['available', 'cancelled'] },
  });
  if (!availableSlots || availableSlots.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No slots are available right now',
    );
  }
  const slotQuery = new QueryBuilder(
    Slot.find({
      _id: { $in: availableSlots.map((slot) => slot._id) },
    }).populate('service'),
    query,
  ).search(slotSearchableFields);
  const result = await slotQuery.modelQuery;

  return result;
};

export const slotServices = {
  createSlotsIntoDb,
  getAllAvailableSlotsFromDb,
};
