import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../../src/utils/config';

export = async function globalTeardown() {
   if (config.Memory) {
      // Config to decide if an mongodb-memory-server instance should be used
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
      await instance.stop();
   }
};
