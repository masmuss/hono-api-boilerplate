import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { selectCategorySchema } from "@/db/schemas/category";
import { selectProductSchema } from "@/db/schemas/product";
import { notFoundSchema } from "@/lib/constants";

const tags: string[] = ["categories"];

export const allCategories = createRoute({
  tags,
  path: "/categories",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCategorySchema),
      "get all categories",
    ),
  },
});

export const getCategoryById = createRoute({
  tags,
  path: "/categories/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        category: selectCategorySchema,
        children: z.array(selectCategorySchema),
      }),
      "get category by id",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContentRequired(
      notFoundSchema,
      "category not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentRequired(
      createErrorSchema(IdParamsSchema),
      "invalid id",
    ),
  },
});

export const getSubcategoriesAndProducts = createRoute({
  tags,
  path: "/categories/{id}/products",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        category: selectCategorySchema,
        children: z.array(selectCategorySchema),
        products: z.array(selectProductSchema),
      }),
      "get subcategories and products by category id",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContentRequired(
      notFoundSchema,
      "category not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentRequired(
      createErrorSchema(IdParamsSchema),
      "invalid id",
    ),
  },
});

export type CategoriesRoute = typeof allCategories;
export type CategoriesRouteWithId = typeof getCategoryById;
export type CategoriesRouteWithIdAndProducts = typeof getSubcategoriesAndProducts;
