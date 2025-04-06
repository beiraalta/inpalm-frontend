import { ObjectIdName } from '@/shared/custom_types';
import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  user: z.string().email(),
  password: z.string().optional(),
});

export type Account = z.infer<typeof AccountSchema>;

export type Role = {
  id?: string;
  accounts: ObjectIdName[];
};
