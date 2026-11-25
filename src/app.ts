import express from 'express';
import { imcRoutes } from './routes/imc.routes.js';
import { errorHandler } from './middlewares/error-handler.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });
  app.use('/api', imcRoutes);

  app.use(errorHandler);
  return app;
}
