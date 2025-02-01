import { and, eq, isNull } from "drizzle-orm";

import { BaseRepository } from "@/core/base/base-repository";
import { productsTable } from "@/core/db/schemas/product";

import type { CreateProduct, Product } from "@/routers/products/products.types";

export class ProductsRepository extends BaseRepository<typeof productsTable> {
  constructor() {
    super(productsTable);
  }

  async getAll(filter: Record<string, any>): Promise<Product[]> {
    const filterCondition = this.filterBuilder(filter);
    const searchCondition = filter.search ? this.searchBuilder(filter.search, ["name"]) : null;

    return await this.drizzle
      .select()
      .from(productsTable)
      .where(and(isNull(productsTable.deletedAt), ...filterCondition, ...(searchCondition ? [searchCondition] : [])));
  }

  async findById(id: number): Promise<Product[]> {
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
