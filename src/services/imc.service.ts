import { avaliarImc, ResultadoImc } from '../domain/imc.js';

/**
 * Camada de aplicação: orquestra o caso de uso usando o domínio.
 * Ponto de extensão para persistência, logs, histórico etc.
 */
export class ImcService {
  calcular(peso: number, altura: number): ResultadoImc {
    return avaliarImc(peso, altura);
  }
}
