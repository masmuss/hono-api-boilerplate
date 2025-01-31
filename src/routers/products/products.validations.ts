import { createInsertSchema } from "drizzle-zod";

import { productsTable } from "@/db/schemas/product";

export const selectProductSchema = createInsertSchema(productsTable);
export const createProductSchema = createInsertSchema(productsTable, {
  categoryId: schema => schema.min(1),
  name: schema => schema.min(5).max(255),
  quantity: schema => schema.min(1),
}).required({
  categoryId: true,
  name: true,
  quantity: true,
});

export const updateProductSchema = createProductSchema.partial();
