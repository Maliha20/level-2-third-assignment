import mongoose from 'mongoose';

import { TErrorMessages, TGenericErrorResponse } from '../middlewares/interface/errors.interface';


const handleCastError = (err: mongoose.Error.CastError):TGenericErrorResponse=> {
  const errorMessages: TErrorMessages = [{
    path : err.path,
    message : err.message
  }]
  const success = false;

  return {
    success,
    message: err.message,
    errorMessages,
  };
};

export default handleCastError;
