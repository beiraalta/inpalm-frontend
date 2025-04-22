import { defaultLanguage } from "@/shared/constants/languages";
import { z } from "zod";

export const PiecePendingSchema = z.object({
  actual_length: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  actual_width: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  adjustment_length: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .optional(),
  adjustment_width: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .optional(),
  description: z
    .string()
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  estimated_delivery_date: z
    .string({ required_error: defaultLanguage.FAILURE.MANDATORY_FIELD })
    .datetime({ message: defaultLanguage.FAILURE.INVALID_DATETIME }),
  note: z.string().optional(),
  quantity: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
  thickness: z
    .number({ message: defaultLanguage.FAILURE.INVALID_NUMBER })
    .min(1, { message: defaultLanguage.FAILURE.MANDATORY_FIELD }),
});
export type PiecePendingType = z.infer<typeof PiecePendingSchema>;

export const PiecePendingListSchema = z.object({
  id: z.string(),
  piece_pending_items: z.array(PiecePendingSchema),
});
export type PiecePendingListType = z.infer<typeof PiecePendingListSchema>;
