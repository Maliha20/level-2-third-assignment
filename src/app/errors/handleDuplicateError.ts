/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorMessages, TGenericErrorResponse } from "../middlewares/interface/errors.interface";


const handleDuplicateError = (err: any):TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/)

    const extractedMessage = match && match[1]
  const errorMessages: TErrorMessages = [{
    path : '',
    message : extractedMessage
  }]
  const success = false;
  
   
  return {
    success,
    message : err.message,
    errorMessages,
  };
};

export default handleDuplicateError;