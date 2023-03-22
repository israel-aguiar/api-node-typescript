import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type Tproperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<Tproperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas(schema => schema);

  const errorsResult: Record<string, Record<string, string>> = {};



  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as Tproperty], { abortEarly: false });
      
    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};
  
      yupError.inner.forEach(error => {
        //if (error.path) return;
        if (error.path === undefined) return;//mesma coisa
  
        errors[error.path] = error.message;
      });

      errorsResult[key] = errors;
    }
    
  });

  if ( Object.entries(errorsResult).length === 0 ){
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errorsResult });
  }
};
  