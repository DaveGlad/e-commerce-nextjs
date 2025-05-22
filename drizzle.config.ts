import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";

loadEnvConfig(cwd());

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
