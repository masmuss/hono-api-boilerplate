import configureOpenAPI from "@/core/utils/lib/configure-openapi";
import createApp from "@/core/utils/lib/create-app";
import products from "@/routers/products/index.router";

const app = createApp();

const routes = [products];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
