import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { notFoundSchema } from "@/lib/constants";

import { createProductSchema, selectProductSchema, updateProductSchema } from "./products.validations";

export class ProductsRoutes {
  private tags: string[] = ["products"];

  allProducts = createRoute({
    tags: this.tags,
    path: "/products",
    method: "get",
    request: {
      query: z.object({
        search: z.string().optional(),
        name: z.string().optional(),
        categoryId: z.number().optional(),
      }),
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          data: z.array(selectProductSchema),
          message: z.string(),
          error: z.nullable(z.string()),
        }),
        "get all products",
      ),
    },
  });

  productById = createRoute({
    tags: this.tags,
    path: "/products/{id}",
    method: "get",
    request: {
      params: IdParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(z.object({
        data: selectProductSchema,
        message: z.string(),
        error: z.nullable(z.string()),
      }), "get product by id"),
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

  createProduct = createRoute({
    tags: this.tags,
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

  putProduct = createRoute({
    tags: this.tags,
    path: "/products/{id}",
    method: "put",
    request: {
      params: IdParamsSchema,
      body: jsonContentRequired(updateProductSchema, "update product"),
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(selectProductSchema, "updated product"),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "product not found",
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(IdParamsSchema).or(createErrorSchema(updateProductSchema)),
        "validation error(s)",
      ),
    },
  });

  deleteProduct = createRoute({
    tags: this.tags,
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
}
