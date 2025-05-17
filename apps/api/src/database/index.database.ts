import env from "@/api/constant/env";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/api/database/schema/index.schema";

const databaseClient = drizzle(env.DATABASE_URL, {
  schema,
});

export default databaseClient;
