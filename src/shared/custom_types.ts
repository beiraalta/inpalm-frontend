import { z } from "zod";

export const ObjectIdNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ObjectIdNameType = z.infer<typeof ObjectIdNameSchema>;

export const BaseSchema = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  created_by: ObjectIdNameSchema.optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: ObjectIdNameSchema.optional(),
});

export type T = any;

export type APIResponse<T> = {
  message: string;
  status: string;
  data: T;
};

export type Records<T> = {
  records: T[];
  filtered: number;
  total: number;
};