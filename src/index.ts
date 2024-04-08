import app from './app';
import config from './utils/config';
import mongoose from 'mongoose';

const { port: PORT, db_uri } = config;

mongoose
  .connect(db_uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    throw new Error(`MongoDB connection error: ${error}`);
  });

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
