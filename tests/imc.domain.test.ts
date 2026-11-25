import { describe, expect, it } from 'vitest';
import { avaliarImc, calcularImc, classificarImc, ClassificacaoImc, DomainError } from '../src/domain/imc.js';

describe('calcularImc', () => {
  it('calcula peso / altura²', () => {
    expect(calcularImc(70, 1.75)).toBeCloseTo(22.857, 3);
  });

  it.each([
    [0, 1.75],
    [-10, 1.75],
    [70, 0],
    [70, -1.7],
    [NaN, 1.75],
    [70, NaN],
  ])('rejeita peso=%s altura=%s', (peso, altura) => {
    expect(() => calcularImc(peso, altura)).toThrow(DomainError);
  });
});

describe('classificarImc', () => {
  it.each([
    [10, ClassificacaoImc.Magreza],
    [18.49, ClassificacaoImc.Magreza],
    [18.5, ClassificacaoImc.Normal],
    [24.9, ClassificacaoImc.Normal],
    [24.95, ClassificacaoImc.Normal],
    [25, ClassificacaoImc.Sobrepeso],
    [30, ClassificacaoImc.Sobrepeso],
    [30.01, ClassificacaoImc.Obesidade],
    [45, ClassificacaoImc.Obesidade],
  ])('IMC %s => %s', (imc, esperado) => {
    expect(classificarImc(imc)).toBe(esperado);
  });
});

describe('avaliarImc', () => {
  it('retorna IMC arredondado em 2 casas e a classificação', () => {
    expect(avaliarImc(70, 1.75)).toEqual({ imc: 22.86, classificacao: ClassificacaoImc.Normal });
  });
});
