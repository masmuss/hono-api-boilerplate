import { relations } from "drizzle-orm";
import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import timestamps from "@/helpers/db-table-timestamps";

import { categoriesTable } from "./category";

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").default(0),
    ...timestamps,
  },
  table => [index("products_idx").on(table.name)],
);

export const productsRelations = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
}));

export const selectProductSchema = createSelectSchema(productsTable);
export const createProductSchema = createInsertSchema(productsTable, {
  categoryId: schema => schema.min(1),
  name: schema => schema.min(5).max(255),
  quantity: schema => schema.min(1),
}).required({
  categoryId: true,
  name: true,
  quantity: true,
});

export const putProductSchema = createProductSchema.partial();
