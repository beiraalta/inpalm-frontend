import { defaultLanguage } from "@/shared/constants/languages";
import { BaseSchema } from "@/shared/custom_types";
import { z } from "zod";

export const PiecePendingSchema = z.object({
  actual_length: z.number(),
  actual_width: z.number(),
  adjustment_length: z.number().optional(),
  adjustment_width: z.number().optional(),
  description: z.string(),
  estimated_delivery_date: z.string().datetime(),
  note: z.string().optional(),
  quantity: z.number(),
  thickness: z.number(),
});

export const PurchasePendingSchema = z.object({
  description: z.string(),
  estimated_delivery_date: z.string().datetime(),
  note: z.string().optional(),
  quantity: z.number(),
  unit: z.string(),
});

export const TechnicalReportSchema = z.object({
  filepath: z.string().optional(),
  finished_at: z.preprocess(
    (arg) => {
      if (arg === undefined || arg === null || arg === "") return null;
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
      return null;
    },
    z
      .date({
        required_error: defaultLanguage.FAILURE.MANDATORY_FIELD,
        invalid_type_error: defaultLanguage.FAILURE.MANDATORY_FIELD,
      })
      .refine((date) => !isNaN(date.getTime()), {
        message: defaultLanguage.FAILURE.MANDATORY_FIELD,
      })
  ),
  note: z.string().min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  photo: z.string().optional(),
  started_at: z.preprocess(
    (arg) => {
      if (arg === undefined || arg === null || arg === "") return null;
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
      return null;
    },
    z
      .date({
        required_error: defaultLanguage.FAILURE.MANDATORY_FIELD,
        invalid_type_error: defaultLanguage.FAILURE.MANDATORY_FIELD,
      })
      .refine((date) => !isNaN(date.getTime()), {
        message: defaultLanguage.FAILURE.MANDATORY_FIELD,
      })
  ),
});

export type TechnicalReportType = z.infer<typeof TechnicalReportSchema>;

export const ChecklistSchema = BaseSchema.extend({
  assembly_team: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  customer: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  delivery_responsible_pnc: z.string().optional(),
  environments: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  inspected_by: z.string().optional(),
  piece_pending_items: z.array(PiecePendingSchema).optional(),
  piece_pending_notes: z.string().optional(),
  project_code: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  purchase_pending_items: z.array(PurchasePendingSchema).optional(),
  purchase_pending_notes: z.string().optional(),
  technical_reports: z.array(TechnicalReportSchema),
});
export type ChecklistType = z.infer<typeof ChecklistSchema>;
