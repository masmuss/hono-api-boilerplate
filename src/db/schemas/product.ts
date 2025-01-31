import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import timestampsHelper from "@/helpers/db-table-timestamps.helper";

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    quantity: integer("quantity").default(0),
    ...timestampsHelper,
  },
  table => [index("products_idx").on(table.name)],
);