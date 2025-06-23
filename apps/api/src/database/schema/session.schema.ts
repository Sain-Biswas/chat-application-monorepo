import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./users.schema";

export const sessionSchema = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => userSchema.id, { onDelete: "cascade" }),
});
