import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController } from './../controllers';

import { } from './../controllers';


const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá DEV!');
});

router.post('/cidades',
  CidadesController.createQueryValidator,
  CidadesController.createBodyValidator,
  CidadesController.create
);



export { router };