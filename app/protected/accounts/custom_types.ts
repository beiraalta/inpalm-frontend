import { BaseSchema, ObjectIdNameType } from "@/shared/custom_types";
import { DefaultLanguage } from "@/shared/constants/languages";
import { z } from "zod";

export const BaseAccountSchema = BaseSchema.extend({
  name: z.string().min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
  user: z
    .string()
    .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD })
    .email({ message: DefaultLanguage.FAILURE.INVALID_EMAIL }),
});

export const AccountSchema = BaseAccountSchema.extend({
  password: z.string().optional(),
});
export type AccountType = z.infer<typeof AccountSchema>;

export const AddAccountSchema = BaseAccountSchema.extend({
  password: z
    .string()
    .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
  confirmPassword: z
    .string()
    .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
}).refine((data) => data.password === data.confirmPassword, {
  message: DefaultLanguage.FAILURE.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});
export type AddAccountType = z.infer<typeof AddAccountSchema>;

export type RoleType = {
  id?: string;
  accounts: ObjectIdNameType[];
};
