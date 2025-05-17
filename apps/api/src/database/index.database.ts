import env from "@/constant/env";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/database/schema/index.schema";

const databaseClient = drizzle(env.DATABASE_URL, {
  schema,
});

export default databaseClient;
