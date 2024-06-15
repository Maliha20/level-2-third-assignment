import { z } from 'zod';

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message:
      'Invalid time format , The time must be in "HH:MM"- 24 hours format',
  },
);
const dateValidationSchema = z.string().refine(
  (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  },
  {
    message: 'Invalid date format. Expected format: YYYY-MM-DD',
  },
)
const slotValidationSchema = z.object({
body: z.object({
  service: z.string(),
  date: dateValidationSchema,
  startTime: timeValidationSchema,
  endTime: timeValidationSchema,
}).refine((body) => {
  const start = new Date(`1970-01-01T${body.startTime}:00`);
  const end = new Date(`1970-01-01T${body.endTime}:00`);

  return end > start;
}, {
  message: 'End time should be after start time',


})  })

export const slotValidations = {
  slotValidationSchema,
};
