import { timestamp } from "drizzle-orm/pg-core";

const timestampsHelper = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
};

export default timestampsHelper;
