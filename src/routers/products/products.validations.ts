import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { productsTable } from "@/core/db/schemas/product";

export const selectProductSchema = createSelectSchema(productsTable);
export const createProductSchema = createInsertSchema(productsTable, {
  name: schema => schema.min(5).max(255),
  quantity: schema => schema.min(1),
}).required({
  name: true,
  quantity: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const updateProductSchema = createProductSchema.partial();
