import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../domain/imc.js';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof DomainError) {
    res.status(400).json({ erro: err.message });
    return;
  }
  if (err instanceof SyntaxError) {
    res.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });
    return;
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}
