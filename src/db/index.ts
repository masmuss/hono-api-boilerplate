import { drizzle } from "drizzle-orm/node-postgres";

import env from "@/env";

import * as products from "./schemas/product";

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema: { ...products },
});

export default db;
