// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  age: z.number().int().positive(),
});

// Data to be validated
const userData = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  age: 25,
};

// Validate the data against the schema
try {
  const validatedData = userSchema.parse(userData);
  console.log('Data is valid:', validatedData);
} catch (error) {
  console.error('Validation error:', error);
}
