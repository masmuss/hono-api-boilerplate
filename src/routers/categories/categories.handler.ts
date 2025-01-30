import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";

import type {
  CategoriesRoute,
  CategoriesRouteWithId,
  CategoriesRouteWithIdAndProducts,
} from "./categories.routes";

export const getAllCategories: AppRouteHandler<CategoriesRoute> = async (c) => {
  const categories = await db.query.categoriesTable.findMany({
    where(fields, operator) {
      return operator.and(
        operator.isNull(fields.deletedAt),
        operator.isNull(fields.parentId),
      );
    },
  });
  return c.json(categories, HttpStatusCodes.OK);
};

export const getCategoryById: AppRouteHandler<CategoriesRouteWithId> = async (
  c,
) => {
  const { id } = c.req.valid("param");
  const category = await db.query.categoriesTable.findFirst({
    where(fields, operator) {
      return operator.and(operator.isNull(fields.deletedAt), eq(fields.id, id));
    },
  });

  if (!category) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const children = await db.query.categoriesTable.findMany({
    where(fields, operator) {
      return operator.and(
        operator.isNull(fields.deletedAt),
        eq(fields.parentId, id),
      );
    },
  });

  return c.json({ category, children }, HttpStatusCodes.OK);
};

export const getSubcategoriesAndProducts: AppRouteHandler<
  CategoriesRouteWithIdAndProducts
> = async (c) => {
  const { id } = c.req.valid("param");
  const category = await db.query.categoriesTable.findFirst({
    where(fields, operator) {
      return operator.and(operator.isNull(fields.deletedAt), eq(fields.id, id));
    },
  });

  if (!category) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const children = await db.query.categoriesTable.findMany({
    where(fields, operator) {
      return operator.and(
        operator.isNull(fields.deletedAt),
        eq(fields.parentId, id),
      );
    },
  });

  const products = await db.query.productsTable.findMany({
    where(fields, operator) {
      return operator.and(
        operator.isNull(fields.deletedAt),
        eq(fields.categoryId, id),
      );
    },
  });

  return c.json({ category, children, products }, HttpStatusCodes.OK);
};
