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
  note: z.string(),
  filepath: z.string().optional(),
  photo: z.string().optional(),
});
export type TechnicalReportType = z.infer<typeof TechnicalReportSchema>;

export const ChecklistSchema = BaseSchema.extend({
  assembly_team: z.string(),
  customer: z.string(),
  delivery_responsible_pnc: z.string().optional(),
  environments: z.string(),
  inspected_by: z.string().optional(),
  piece_pending_items: z.array(PiecePendingSchema).optional(),
  piece_pending_notes: z.array(z.string()).optional(),
  project_code: z.string(),
  purchase_pending_items: z.array(PurchasePendingSchema).optional(),
  purchase_pending_notes: z.array(z.string()).optional(),
  technical_reports: z.array(TechnicalReportSchema),
});
export type ChecklistType = z.infer<typeof ChecklistSchema>;
