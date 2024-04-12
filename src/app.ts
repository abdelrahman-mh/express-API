import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import config from './utils/config';
import swaggerUi from 'swagger-ui-express';
import notesRoutes from './routes/v1/noteRoutes';
import apiDocsRoute from './routes/v1/docs.router';
import { successMorganHandler, errorMorganHandler } from './utils/logger';
import usersRoutes from './routes/v1/userRoutes';
import errorHandler from './middlewares/errorMiddleware';

const app = express();

// Logger
if (config.env !== 'test') {
  app.use(successMorganHandler);
  app.use(errorMorganHandler);
}

// middleware
app.use(express.json());
app.use('/docs', swaggerUi.serve);

// routes
app.use(apiDocsRoute);
app.use('/api/notes', notesRoutes);
app.use('/api/users', usersRoutes);
// app.use('/api/auth', authRoutes);

app.get('/ping', (_req, res) => {
  res.send('✨ ping ✨');
});

app.use(errorHandler);
export default app;
