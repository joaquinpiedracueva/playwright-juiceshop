import { z } from 'zod';

export const changePasswordResponseSchema = z.object({
  user: z.object({
    id: z.number().int().positive(),
    email: z.email(),
    username: z.string(),
    password: z.string().min(1),
    role: z.enum(['customer', 'admin', 'deluxe']),
    deluxeToken: z.string(),
    profileImage: z.string(),
    totpSecret: z.string(),
    isActive: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    deletedAt: z.null(),
  }),
});
