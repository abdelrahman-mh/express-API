import dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from '../../src/utils/config';
export = async function globalSetup() {
   if (config.Memory) {
      // Config to decide if an mongodb-memory-server instance should be used
      // it's needed in global space, because we don't want to create a new instance every test-suite
      const instance = await MongoMemoryServer.create();
      const uri = instance.getUri();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).__MONGOINSTANCE = instance;
      config.databaseUrl = uri.slice(0, uri.lastIndexOf('/'));
   } else {
      throw new Error('No data base available if you need to connection to real data base not on client edit globalSetup.ts file');
   }

   // The following is to make sure the database is clean before an test starts
   await mongoose.connect(`${config.databaseUrl}/${config.TestDb}`);
   await mongoose.connection.db.dropDatabase();
   await mongoose.disconnect();
};
