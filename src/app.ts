import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import notesRoutes from './routes/noteRoutes';
// import usersRoutes from './routes/userRoutes';
// import authRoutes from './routes/authRoutes';
// import errorHandler from './middlewares/errorMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import apiDocsRoute from './routes/docs.router';
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve);

// routes
app.use(apiDocsRoute);
app.use('/api/notes',authMiddleware, notesRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/auth', authRoutes);

app.get('/ping', (_req, res) => {
  res.send('✨ ping ✨');
});

// app.use(errorHandler);
export default app;
