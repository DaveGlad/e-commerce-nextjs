import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import sampleData from "@/lib/sample-data";
import * as schema from "./schema";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
    });

    console.log("Connecting to database...", client);
    await client.connect();
    const db = drizzle(client);

    await db.delete(schema.products);

    const resProducts = await db
      .insert(schema.products)
      .values(sampleData.products)
      .returning();
    console.log({ resProducts });
    await client.end();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
