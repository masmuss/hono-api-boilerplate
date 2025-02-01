import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { z } from "zod";

import type { productsTable } from "@/core/db/schemas/product";

import type { createProductSchema, updateProductSchema } from "./products.validations";

import { ProductsRoutes } from "./products.routes";

export type Product = InferSelectModel<typeof productsTable>;
export type CreateProduct = InferInsertModel<typeof productsTable>;

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;

export const productsRoutes = new ProductsRoutes();

export type ProductsRoute = typeof productsRoutes.allProducts;
export type ProductByIdRoute = typeof productsRoutes.productById;
export type CreateProductRoute = typeof productsRoutes.createProduct;
export type PutProductRoute = typeof productsRoutes.putProduct;
export type DeleteProductRoute = typeof productsRoutes.deleteProduct;
