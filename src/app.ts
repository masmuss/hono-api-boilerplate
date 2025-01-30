import configureOpenAPI from "@/lib/configure-openapi";
import createApp from "@/lib/create-app";
import categories from "@/routers/categories/index.router";
import products from "@/routers/products/index.router";

const app = createApp();

const routes = [categories, products];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
