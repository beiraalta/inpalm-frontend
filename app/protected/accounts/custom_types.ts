import { DefaultLanguage } from "@/shared/constants/languages";
import { ObjectIdName } from "@/shared/custom_types";
import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
  password: z
  .string()
  .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
  user: z
    .string()
    .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD })
    .email({ message: DefaultLanguage.FAILURE.INVALID_EMAIL }),
});
export type AccountType = z.infer<typeof AccountSchema>;

export const ExtendedAccountSchema = AccountSchema.extend({
  confirmPassword: z
    .string()
    .min(1, { message: DefaultLanguage.FAILURE.MANDATORY_FIELD }),
}).refine((data) => data.password === data.confirmPassword, {
  message: DefaultLanguage.FAILURE.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});
export type ExtendedAccountType = z.infer<typeof ExtendedAccountSchema>;

export type RoleType = {
  id?: string;
  accounts: ObjectIdName[];
};