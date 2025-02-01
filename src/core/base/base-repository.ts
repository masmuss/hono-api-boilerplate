import type { SQL, InferSelectModel, InferInsertModel } from "drizzle-orm";
import { eq, isNull, or, sql } from "drizzle-orm";
import db from "@/core/db";
import { PgTable, TableLikeHasEmptySelection } from "drizzle-orm/pg-core";

export class BaseRepository<T extends PgTable> {
  protected drizzle;
  protected table: T;

  constructor(table: T) {
    this.drizzle = db;
    this.table = table;
  }

  protected filterBuilder(filter: Partial<InferSelectModel<T>>) {
    const conditions: SQL[] = [];

    const { search, ...filtered } = filter;
    console.log(filtered);

    for (const key in filtered) {
      const value = filtered[key];
      const column = (this.table as any)[key];

      if (value === null) {
        conditions.push(isNull(column));
      } else {
        conditions.push(eq(column, value));
      }
    }

    return conditions;
  }

  protected searchBuilder(search: string, columns: (keyof InferSelectModel<T>)[]) {
    const conditions: SQL[] = [];

    columns.forEach((col) => {
      const column = (this.table as any)[col];
      conditions.push(sql`${column} ILIKE ${`%${search}%`}`);
    });

    return or(...conditions);
  }
}
