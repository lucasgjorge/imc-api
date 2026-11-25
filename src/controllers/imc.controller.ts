import { Request, Response } from 'express';
import { ImcService } from '../services/imc.service.js';

/**
 * Camada de apresentação: traduz HTTP <-> caso de uso.
 * Nenhuma regra de negócio aqui.
 */
export class ImcController {
  constructor(private readonly service: ImcService) {}

  calcular = (req: Request, res: Response): void => {
    const { peso, altura } = req.body ?? {};
    const resultado = this.service.calcular(Number(peso), Number(altura));
    res.status(200).json(resultado);
  };
}
