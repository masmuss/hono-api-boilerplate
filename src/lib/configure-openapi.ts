import { apiReference } from "@scalar/hono-api-reference";

import type { App } from "./types";

import packageJson from "../../package.json";

export default function configureOpenAPI(app: App) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
  });

  app.get(
    "/reference",
    apiReference({
      layout: "classic",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "axios",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
