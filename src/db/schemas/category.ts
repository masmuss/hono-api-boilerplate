import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import timestamps from "@/helpers/db-table-timestamps";

import { productsTable } from "./product";

export const categoriesTable = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    parentId: integer("parent_id"),
    name: text("name").notNull(),
    ...timestamps,
  },
  table => [index("categories_idx").on(table.name)],
);

export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));

export const selectCategorySchema = createSelectSchema(categoriesTable);
