import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import notesRoutes from './routes/noteRoutes';
import apiDocsRoute from './routes/docs.router';
import usersRoutes from './routes/userRoutes';
// import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorMiddleware';
// import authMiddleware from './middlewares/authMiddleware';

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
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
