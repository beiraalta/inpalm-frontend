import { BaseSchema, ObjectIdNameType } from "@/shared/custom_types";
import { defaultLanguage } from "@/shared/constants/languages";
import { z } from "zod";

export const BaseAccountSchema = BaseSchema.extend({
  name: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  user: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD })
    .email({ message: defaultLanguage.FAILURE.INVALID_EMAIL }),
});

export const AccountSchema = BaseAccountSchema.extend({
  password: z.string().optional(),
});
export type AccountType = z.infer<typeof AccountSchema>;

export const AddAccountSchema = BaseAccountSchema.extend({
  password: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  confirmPassword: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
}).refine((data) => data.password === data.confirmPassword, {
  message: defaultLanguage.FAILURE.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});
export type AddAccountType = z.infer<typeof AddAccountSchema>;