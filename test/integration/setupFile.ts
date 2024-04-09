import mongoose from 'mongoose';
import config from '../../src/utils/config';
beforeAll(async () => {
  await mongoose.connect(config.databaseUrl);
  console.log('Connection to MongoDB ✔️');
});

afterAll(async () => {
  await mongoose.disconnect();
  console.log('Disconnect from MongoDB 👎');
});
