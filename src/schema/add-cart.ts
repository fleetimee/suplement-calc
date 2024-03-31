import { z } from "zod";

export const addCartSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});
