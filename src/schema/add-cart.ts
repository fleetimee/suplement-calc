import { z } from "zod";

export const addCartSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  quantity: z.number(),
  price: z.number().min(1),
  total: z.number().min(1),
});
