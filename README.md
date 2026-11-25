# IMC API

API REST em Node.js + TypeScript (Express) que calcula o IMC no backend.

**IMC = peso (kg) / altura² (m)**

| Classificação | Faixa (kg/m²)       |
|---------------|---------------------|
| Magreza       | IMC < 18,5          |
| Normal        | 18,5 ≤ IMC < 25     |
| Sobrepeso     | 25 ≤ IMC ≤ 30       |
| Obesidade     | IMC > 30            |

> O enunciado original sobrepõe as faixas em 24,9 e 30. Aqui, Normal vai até < 25 (sem lacuna entre 24,9 e 25) e 30 exato é Sobrepeso.

## Arquitetura

```
src/
├── domain/        # Regra de negócio pura (cálculo + classificação). Sem dependência de HTTP.
├── services/      # Casos de uso: orquestram o domínio.
├── controllers/   # Traduzem HTTP <-> serviço.
├── routes/        # Mapeamento de rotas Express.
├── middlewares/   # Tratamento de erros (DomainError -> 400).
├── app.ts         # Composição da aplicação.
└── server.ts      # Bootstrap (porta).
```

Fluxo: `route → controller → service → domain`. O domínio pode ser reutilizado em qualquer outro adaptador (CLI, fila, outro framework) sem alteração.

## Como rodar

```bash
npm install
npm run dev        # desenvolvimento (hot reload)
npm run build && npm start   # produção
npm test           # testes (Vitest + Supertest)
```

Porta padrão `3000` (configurável via `PORT`).

## Endpoint

`POST /api/imc`

```bash
curl -X POST http://localhost:3000/api/imc \
  -H "Content-Type: application/json" \
  -d '{"peso": 70, "altura": 1.75}'
```

Resposta `200`:

```json
{ "imc": 22.86, "classificacao": "Normal" }
```

Erro `400` (peso/altura ausentes, não numéricos ou ≤ 0):

```json
{ "erro": "Altura deve ser um número maior que zero (em metros)." }
```

`GET /health` → `{ "status": "ok" }`
