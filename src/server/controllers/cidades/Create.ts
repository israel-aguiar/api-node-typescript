import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


interface ICidade {
  nome: string,
  estado: string
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({

  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),

}).noUnknown();

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false, strict: true });

  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      //if (error.path) return;
      if (error.path === undefined) return;//mesma coisa
      
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: validationErrors,
      }
    });
  }
  
  return res.send('Create!');
};