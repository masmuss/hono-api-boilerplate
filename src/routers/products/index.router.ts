import { createRouter } from "@/lib/create-app";

import * as handlers from "./products.handler";
import * as routes from "./products.routes";

const router = createRouter()
  .openapi(routes.allProducts, handlers.getAllProduct)
  .openapi(routes.productById, handlers.getProductById)
  .openapi(routes.createProduct, handlers.createProduct)
  .openapi(routes.putProduct, handlers.updateProduct)
  .openapi(routes.deleteProduct, handlers.deleteProduct);

export default router;
