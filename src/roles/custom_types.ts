import { BaseSchema, ObjectIdNameSchema } from "@/shared/custom_types";
import { defaultLanguage } from "@/shared/constants/languages";
import { z } from "zod";

export const ResourceSchema = BaseSchema.extend({
  name: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  endpoint: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  ignores_policy: z.boolean().default(false),
});
export type ResourceType = z.infer<typeof ResourceSchema>;

export enum RolePolicy {
  ALLOW = "allow",
  DENY = "deny"
}

export const RoleSchema = BaseSchema.extend({
  accounts: z.array(ObjectIdNameSchema),
  configs: z.array(ObjectIdNameSchema),
  default_policy: z.nativeEnum(RolePolicy),
  name: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  policy_exceptions: z.array(ObjectIdNameSchema),
  resource_policies: z.any()
});
export type RoleType = z.infer<typeof RoleSchema>;

export const RoleValidationSchema = BaseSchema.extend({
  accounts: z.array(z.string()),
  configs: z.array(ObjectIdNameSchema),
  default_policy: z.nativeEnum(RolePolicy),
  name: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  policy_exceptions: z.array(z.string()),
  resource_policies: z.any()
});