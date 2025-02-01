import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/core/types";

import type {
  CreateProductRoute,
  DeleteProductRoute,
  ProductByIdRoute,
  ProductsRoute,
  PutProductRoute,
} from "../../routers/products/products.types";

import { ProductsRepository } from "../../repositories/products/products.repository";
import { BaseHandler } from "@/core/base/base-handler";

export class ProductsHandler extends BaseHandler {
  
  constructor() {
    super(new ProductsRepository());
  }

  getAllProduct: AppRouteHandler<ProductsRoute> = async (c) => {
    const filter = c.req.valid("query");

    const products = await this.repository.getAll(filter);
    return c.json(this.responseBuilder(
      products,
      this.messageHelper.successGetAllMessage("products"),
      null,
    ), HttpStatusCodes.OK);
  };

  getProductById: AppRouteHandler<ProductByIdRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const product = await this.repository.findById(id);

    if (!product) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.json(this.responseBuilder(
      product,
      this.messageHelper.successGetByIdMessage("products"),
      null,
    ), HttpStatusCodes.OK);
  };

  createProduct: AppRouteHandler<CreateProductRoute> = async (c) => {
    const product = c.req.valid("json");
    const inserted = await this.repository.create(product);
    return c.json(inserted, HttpStatusCodes.CREATED);
  };

  updateProduct: AppRouteHandler<PutProductRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const newProductData = c.req.valid("json");

    const updated = await this.repository.update(id, newProductData);
    if (!updated) {
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(updated, HttpStatusCodes.OK);
  };

  deleteProduct: AppRouteHandler<DeleteProductRoute> = async (c) => {
    const { id } = c.req.valid("param");

    const product = await this.repository.findById(id);
    if (!product) {
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    await this.repository.softDelete(id);
    return c.json({ message: HttpStatusPhrases.NO_CONTENT });
  };
}
