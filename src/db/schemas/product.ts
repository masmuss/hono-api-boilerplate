import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import timestamps from "@/helpers/db-table-timestamps";

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    quantity: integer("quantity").default(0),
    ...timestamps,
  },
  table => [index("products_idx").on(table.name)],
);