import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { productsTable } from "@/db/schemas/product";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

import type {
  CreateProductRoute,
  DeleteProductRoute,
  ProductByIdRoute,
  ProductsRoute,
  PutProductRoute,
} from "./products.routes";

export const getAllProduct: AppRouteHandler<ProductsRoute> = async (c) => {
  const products = await db.query.productsTable.findMany({
    where(fields, operator) {
      return operator.isNull(fields.deletedAt);
    },
  });
  return c.json(products, HttpStatusCodes.OK);
};

async function findProductById(id: number) {
  return db.query.productsTable.findFirst({
    where(fields, operator) {
      return operator.and(
        operator.eq(fields.id, id),
        operator.isNull(fields.deletedAt),
      );
    },
  });
}

export const getProductById: AppRouteHandler<ProductByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const product = await findProductById(id);

  if (!product) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(product, HttpStatusCodes.OK);
};

export const createProduct: AppRouteHandler<CreateProductRoute> = async (c) => {
  const product = c.req.valid("json");
  const [inserted] = await db.insert(productsTable).values(product).returning();
  return c.json(inserted, HttpStatusCodes.CREATED);
};

export const updateProduct: AppRouteHandler<PutProductRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const newProductData = c.req.valid("json");

  const product = await findProductById(id);

  if (Object.keys(newProductData).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  const [updated] = await db
    .update(productsTable)
    .set(newProductData)
    .where(eq(productsTable.id, id))
    .returning();

  if (!updated || !product) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

export const deleteProduct: AppRouteHandler<DeleteProductRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const product = await findProductById(id);

  if (!product) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  await db
    .update(productsTable)
    .set({ deletedAt: new Date() })
    .where(eq(productsTable.id, id));

  return c.json({
    message: HttpStatusPhrases.NO_CONTENT,
  });
};
