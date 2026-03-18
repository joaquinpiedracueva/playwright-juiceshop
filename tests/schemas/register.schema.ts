import { z } from 'zod';

export const registerResponseSchema = z.object({
  status: z.literal('success'),
  data: z.object({
    id: z.number().int().positive(),
    email: z.email(),
    username: z.string(),
    role: z.enum(['customer', 'admin', 'deluxe']),
    deluxeToken: z.string(),
    lastLoginIp: z.string(),
    profileImage: z.string(),
    isActive: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    deletedAt: z.null(),
  }),
});
