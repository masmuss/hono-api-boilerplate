import { eq, isNull, SQL, or, sql } from "drizzle-orm";
import db from "@/db";

export class BaseRepository {
    protected drizzle;

    constructor() {
        this.drizzle = db;
    }

    filterBuilder = (table: any, filter: Record<string, any>) => {
        const conditions: SQL[] = [];

        const { search, ...filtered } = filter;
        console.log(filtered);

        for (const key in filtered) {
            const value = filtered[key];
            const column = (table as any)[key];

            if (value === null) {
                conditions.push(isNull(column));
            } else {
                conditions.push(eq(column, value));
            }
        }

        return conditions;
    }

    searchBuilder = (table: any, search: string, column: string[]) => {
        const conditions: SQL[] = [];

        column.forEach((col) => {
            const column = (table as any)[col];

            conditions.push(sql`${column} ILIKE ${`%${search}%`}`);
        });

        return or(...conditions);
    }
}