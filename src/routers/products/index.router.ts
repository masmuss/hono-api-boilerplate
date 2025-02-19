import { createRouter } from "@/core/utils/lib/create-app";

import { ProductsHandler } from "../../handlers/products/products.handler";
import { ProductsRoutes } from "./products.routes";

const productHandler = new ProductsHandler();
const routes = new ProductsRoutes();

const router = createRouter()
  .openapi(routes.allProducts, productHandler.getAllProduct)
  .openapi(routes.productById, productHandler.getProductById)
  .openapi(routes.createProduct, productHandler.createProduct)
  .openapi(routes.putProduct, productHandler.updateProduct)
  .openapi(routes.deleteProduct, productHandler.deleteProduct);

export default router;
