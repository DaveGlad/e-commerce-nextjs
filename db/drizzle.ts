import * as schema from "./schema";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
const db = drizzle(sql, {
  schema,
});
export default db;
