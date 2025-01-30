import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  createProductSchema,
  putProductSchema,
  selectProductSchema,
} from "@/db/schemas/product";
import { notFoundSchema } from "@/lib/constants";

const tags: string[] = ["products"];

export const allProducts = createRoute({
  tags,
  path: "/products",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectProductSchema),
      "get all products",
    ),
  },
});

export const productById = createRoute({
  tags,
  path: "/products/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectProductSchema, "get product by id"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "product not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "invalid id",
    ),
  },
});

export const createProduct = createRoute({
  tags,
  path: "/products",
  method: "post",
  request: {
    body: jsonContentRequired(createProductSchema, "create product"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectProductSchema,
      "created product",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(selectProductSchema),
      "validation error(s)",
    ),
  },
});

export const putProduct = createRoute({
  tags,
  path: "/products/{id}",
  method: "put",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(putProductSchema, "update product"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectProductSchema, "updated product"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "product not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema).or(createErrorSchema(putProductSchema)),
      "validation error(s)",
    ),
  },
});

export const deleteProduct = createRoute({
  tags,
  path: "/products/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "product deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "product not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "invalid id",
    ),
  },
});

export type ProductsRoute = typeof allProducts;
export type ProductByIdRoute = typeof productById;
export type CreateProductRoute = typeof createProduct;
export type PutProductRoute = typeof putProduct;
export type DeleteProductRoute = typeof deleteProduct;
