/**
 * Camada de domínio: regra de negócio do IMC.
 * Não conhece HTTP, Express ou qualquer detalhe de infraestrutura.
 */

export enum ClassificacaoImc {
  Magreza = 'Magreza',
  Normal = 'Normal',
  Sobrepeso = 'Sobrepeso',
  Obesidade = 'Obesidade',
}

export interface ResultadoImc {
  imc: number;
  classificacao: ClassificacaoImc;
}

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

/** IMC = peso (kg) / altura² (m) */
export function calcularImc(pesoKg: number, alturaM: number): number {
  if (!Number.isFinite(pesoKg) || pesoKg <= 0) {
    throw new DomainError('Peso deve ser um número maior que zero (em kg).');
  }
  if (!Number.isFinite(alturaM) || alturaM <= 0) {
    throw new DomainError('Altura deve ser um número maior que zero (em metros).');
  }
  return pesoKg / (alturaM * alturaM);
}

/**
 * Faixas (kg/m²):
 *  - Magreza:   imc < 18,5
 *  - Normal:    18,5 <= imc < 25
 *  - Sobrepeso: 25 <= imc <= 30
 *  - Obesidade: imc > 30
 */
export function classificarImc(imc: number): ClassificacaoImc {
  if (imc < 18.5) return ClassificacaoImc.Magreza;
  if (imc < 25) return ClassificacaoImc.Normal;
  if (imc <= 30) return ClassificacaoImc.Sobrepeso;
  return ClassificacaoImc.Obesidade;
}

export function avaliarImc(pesoKg: number, alturaM: number): ResultadoImc {
  const imc = calcularImc(pesoKg, alturaM);
  return {
    imc: Math.round(imc * 100) / 100,
    classificacao: classificarImc(imc),
  };
}
