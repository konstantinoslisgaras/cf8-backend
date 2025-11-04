import { z } from 'zod';

export const addressSchema = z.object({
  area: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  po: z.string().optional(),
  municipality: z.string().optional()
});

export const phoneSchema = z.object({
  type: z.string().optional(),
  number: z.string().optional()
});

export const createUserSchema = z.object({
  username: z.string().min(3).max(15),
  password: z.string().min(8),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  address: addressSchema.optional(),
  phone: z.array(phoneSchema).optional(),
  roles: z.array(z.string()).optional()
});

export const updateUserSchema = createUserSchema.partial();