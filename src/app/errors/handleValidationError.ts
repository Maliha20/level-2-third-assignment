import mongoose from 'mongoose';
import {  TErrorMessages, TGenericErrorResponse } from '../middlewares/interface/errors.interface';

const handleValidationError = (err: mongoose.Error.ValidationError):TGenericErrorResponse => {
  const errorMessages: TErrorMessages= Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const success = false;

  return {
    success,
    message: err.message,
    errorMessages,
  };
};

export default handleValidationError;
