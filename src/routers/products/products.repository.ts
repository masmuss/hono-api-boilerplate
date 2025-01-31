import { and, eq, isNull, SQL, or } from "drizzle-orm";

import db from "@/db";
import { productsTable } from "@/db/schemas/product";

import type { CreateProduct, Product } from "./products.types";

export class ProductsRepository {
  private drizzle;

  constructor() {
    this.drizzle = db;
  }

  filterBuilder = (table: any, filter: Record<string, any>) => {
    const conditions: SQL[] = [];

    const { search, ...filtered } = filter;

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
      conditions.push(table[col].ilike(`%${search}%`));
    });

    return or(...conditions);
  }

  async getAll(filter: Record<string, any>): Promise<Product[]> {
    const filterCondition = this.filterBuilder(productsTable, filter);
    const searchCondition = filter.search ? this.searchBuilder(productsTable, filter.search, ["name"]) : null;

    console.log(filterCondition, searchCondition);

    return await this.drizzle
      .select()
      .from(productsTable)
      .where(and(isNull(productsTable.deletedAt), ...filterCondition, ...(searchCondition ? [searchCondition] : [])));

  }

  async findById(id: number): Promise<Product[] | null> {
    return await this.drizzle
      .select()
      .from(productsTable)
      .where(and(eq(productsTable.id, id), isNull(productsTable.deletedAt)));
  }

  async create(product: CreateProduct): Promise<Product> {
    const [inserted] = await this.drizzle.insert(productsTable).values(product).returning();
    return inserted;
  }

  async update(id: number, newProductData: Partial<CreateProduct>): Promise<Product> {
    const [updated] = await this.drizzle
      .update(productsTable)
      .set(newProductData)
      .where(eq(productsTable.id, id))
      .returning();

    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.drizzle
      .update(productsTable)
      .set({ deletedAt: new Date() })
      .where(eq(productsTable.id, id));
  }
}
