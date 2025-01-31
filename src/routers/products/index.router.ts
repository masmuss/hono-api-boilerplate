import { createRouter } from "@/lib/create-app";

import { ProductsHandler } from "./products.handler";
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
