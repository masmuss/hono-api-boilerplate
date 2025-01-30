import type { ZodError } from "zod";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = envSchema.parse(process.env);
}
catch (error) {
  const err = error as ZodError;
  console.error("Error parsing environment variables ");
  console.warn(err.flatten().fieldErrors);
  process.exit(1);
}

export default env;
