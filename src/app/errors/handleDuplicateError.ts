/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from "../interface/errors.interface";


const handleDuplicateError = (err: any):TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/)

    const extractedMessage = match && match[1]
  const errorSources: TErrorSources = [{
    path : '',
    message : extractedMessage
  }]
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleDuplicateError;