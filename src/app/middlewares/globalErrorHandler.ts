/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from 'console';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import config from '../config';
import { TErrorMessages } from './interface/errors.interface';



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values

  let errorMessages: TErrorMessages = [
    {
      path: ' ',
      message: 'Something went wrong',
    },
  ];
  let success = false;
  let statusCode = 500;
  let message ='Somehting went wrong!';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }
   //handle validation error
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    success = simplifiedError?.success;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } 
  //handle CastError
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);

    success = simplifiedError?.success;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } 
  //handleDupe-Error
  
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    success = simplifiedError?.success;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }
  //App-error
  else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message;
    errorMessages = [{ path: '', message: err?.message }];
  }
   else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [{ path: '', message: err?.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
