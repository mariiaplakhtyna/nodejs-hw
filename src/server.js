import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import { initMongoConnection } from './db/initMongoConnection.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.use('/notes', notesRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  void req;
  void next;

  const status = err.status || 500;

  res.status(status).json({
    message: err.message,
  });
});

const startServer = async () => {
  await initMongoConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();