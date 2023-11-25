import { z } from 'zod';

// Define the order schema
const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define the user schema using Zod
const userSchema = z.object({
  userId: z.number().int(),
  username: z.string(),
  password: z.string().min(1).max(20),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderSchema).optional(),
  isDeleted: z.boolean().default(false),
});

export default userSchema;