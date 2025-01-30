import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { customPinoLogger } from "@/middlewares/pino-logger";

import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: true,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(customPinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
