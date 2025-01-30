import { createRouter } from "@/lib/create-app";

import * as handlers from "./categories.handler";
import * as routes from "./categories.routes";

const router = createRouter()
  .openapi(routes.allCategories, handlers.getAllCategories)
  .openapi(routes.getCategoryById, handlers.getCategoryById)
  .openapi(
    routes.getSubcategoriesAndProducts,
    handlers.getSubcategoriesAndProducts,
  );
export default router;
