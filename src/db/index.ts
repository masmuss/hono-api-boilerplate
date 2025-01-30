import { drizzle } from "drizzle-orm/node-postgres";

import env from "@/env";

import * as categories from "./schemas/category";
import * as products from "./schemas/product";

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema: { ...products, ...categories },
});

export default db;
