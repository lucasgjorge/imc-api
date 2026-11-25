import { Router } from 'express';
import { ImcController } from '../controllers/imc.controller.js';
import { ImcService } from '../services/imc.service.js';

const controller = new ImcController(new ImcService());

export const imcRoutes = Router();

imcRoutes.post('/imc', controller.calcular);
