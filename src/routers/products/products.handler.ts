import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import type {
  CreateProductRoute,
  DeleteProductRoute,
  ProductByIdRoute,
  ProductsRoute,
  PutProductRoute,
} from "./products.types";

import { ProductsRepository } from "./products.repository";
import { response } from "@/helpers/response";

export class ProductsHandler {
  private productRepository: ProductsRepository;

  constructor() {
    this.productRepository = new ProductsRepository();
  }

  getAllProduct: AppRouteHandler<ProductsRoute> = async (c) => {
    const filter = c.req.valid("query");

    const products = await this.productRepository.getAll(filter);
    return c.json(response(
      products,
      "get all products",
      null,
    ), HttpStatusCodes.OK);
  };

  getProductById: AppRouteHandler<ProductByIdRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const product = await this.productRepository.findById(id);

    if (!product) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.json(response(
      product,
      "get product by id",
      null,
    ), HttpStatusCodes.OK);
  };

  createProduct: AppRouteHandler<CreateProductRoute> = async (c) => {
    const product = c.req.valid("json");
    const inserted = await this.productRepository.create(product);
    return c.json(inserted, HttpStatusCodes.CREATED);
  };

  updateProduct: AppRouteHandler<PutProductRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const newProductData = c.req.valid("json");

    const updated = await this.productRepository.update(id, newProductData);
    if (!updated) {
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(updated, HttpStatusCodes.OK);
  };

  deleteProduct: AppRouteHandler<DeleteProductRoute> = async (c) => {
    const { id } = c.req.valid("param");

    const product = await this.productRepository.findById(id);
    if (!product) {
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    await this.productRepository.softDelete(id);
    return c.json({ message: HttpStatusPhrases.NO_CONTENT });
  };
}
