import { Router } from 'express';

import { CidadesController } from './../controllers';

import { } from './../controllers';


const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá DEV!');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);



export { router };