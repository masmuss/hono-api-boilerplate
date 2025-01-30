# Hono API Boilerplate

A boilerplate for building fully documented type-safe JSON APIs with Hono and Open API.

- [Hono API Boilerplate](#hono-api-boilerplate)
  - [Included](#included)
  - [Setup](#setup)
  - [Code Tour](#code-tour)
  - [References](#references)

## Included

- Structured logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- Documented / type-safe routes with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Interactive API documentation with [scalar](https://scalar.com/#api-docs) / [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- Convenience methods / helpers to reduce boilerplate with [stoker](https://www.npmjs.com/package/stoker)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Single source of truth database schemas with [drizzle](https://orm.drizzle.team/docs/overview) and [drizzle-zod](https://orm.drizzle.team/docs/zod)
- Sensible editor, formatting and linting settings with [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Setup

Clone this template without git history

```sh
git clone https://github.com/masmuss/hono-api-boilerplate.git
cd hono-api-boilerplate
```

Copy .env.example file and fill `PORT` and `DATABASE_URL` value

```sh
cp .env.example .env
```

Install dependencies

```sh
bun install
```

Create PostgreSQL database and push schema

```sh
bun db:generate
bun db:push
```

Run

```sh
bun dev
```

Lint

```sh
bun lint

# or

bun lint:fix
```

Open `http://localhost:3000/reference` to see API documentation

## Code Tour

Base hono app exported from [app.ts](./src/app.ts). Local development uses [@hono/node-server](https://hono.dev/docs/getting-started/nodejs) defined in [index.ts](./src/index.ts) - update this file or create a new entry point to use your preferred runtime.

Typesafe env defined in [env.ts](./src/env.ts) - add any other required environment variables here. The application will not start if any required environment variables are missing

See [src/routes/products](./src/routes/products) for an example Open API group. Copy this folder / use as an example for your route groups.

- Router created in [products.index.ts](./src/routes/products/products.index.ts)
- Route definitions defined in [products.routes.ts](./src/routes/products/products.routes.ts)
- Hono request handlers defined in [products.handlers.ts](./src/routes/products/products.handlers.ts)

All app routes are grouped together and exported into single type as `AppType` in [app.ts](./src/app.ts) for use in [RPC / hono/client](https://hono.dev/docs/guides/rpc).

## References

- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
  - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
  - [Testing](https://hono.dev/docs/guides/testing)
  - [Testing Helper](https://hono.dev/docs/helpers/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [Scalar Documentation](https://github.com/scalar/scalar/tree/main/?tab=readme-ov-file#documentation)
  - [Themes / Layout](https://github.com/scalar/scalar/blob/main/documentation/themes.md)
  - [Configuration](https://github.com/scalar/scalar/blob/main/documentation/configuration.md)
- [w3cj/hono-open-api-starter](https://github.com/w3cj/hono-open-api-starter.git)
