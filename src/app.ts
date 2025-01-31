import configureOpenAPI from "@/lib/configure-openapi";
import createApp from "@/lib/create-app";
import products from "@/routers/products/index.router";

const app = createApp();

const routes = [products];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
