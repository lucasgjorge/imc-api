import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('POST /api/imc', () => {
  it('200 com IMC e classificação', async () => {
    const res = await request(app).post('/api/imc').send({ peso: 95, altura: 1.75 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ imc: 31.02, classificacao: 'Obesidade' });
  });

  it('400 quando a altura é zero', async () => {
    const res = await request(app).post('/api/imc').send({ peso: 70, altura: 0 });
    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/Altura/);
  });

  it('400 quando faltam campos', async () => {
    const res = await request(app).post('/api/imc').send({});
    expect(res.status).toBe(400);
  });

  it('400 com JSON malformado', async () => {
    const res = await request(app)
      .post('/api/imc')
      .set('Content-Type', 'application/json')
      .send('{"peso": 70,');
    expect(res.status).toBe(400);
  });
});
