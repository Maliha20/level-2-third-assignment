import { ZodError, ZodIssue } from 'zod';
import { TErrorMessages,TGenericZodErrorResponse } from '../middlewares/interface/errors.interface';


const handleZodError = (err: ZodError) :TGenericZodErrorResponse => {
  const errorMessages: TErrorMessages= err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  
  return {
    statusCode,
    message: 'Zod error',
    errorMessages,
  };
};

export default handleZodError;
