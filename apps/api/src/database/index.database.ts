import { drizzle } from "drizzle-orm/neon-serverless";
import env from "../constant/env";

import * as schema from "./schema/index.schema";

const databaseClient = drizzle(env.DATABASE_URL, {
  schema,
});

export default databaseClient;
