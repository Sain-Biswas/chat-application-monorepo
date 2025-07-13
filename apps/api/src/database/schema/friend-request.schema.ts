import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./users.schema";

export const friendRequestSchema = pgTable("friend_request", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sentFromId: text("sent_from_id").notNull().references(() => userSchema.id),
  sentToId: text("sent_to_id").notNull().references(() => userSchema.id),
  status: text("status", { enum: ["accepted", "pending", "rejected", "canceled"] }).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull().$onUpdateFn(() => /* @__PURE__ */ new Date()),
});

export const friendRequestRelations = relations(friendRequestSchema, ({ one }) => ({
  sentFrom: one(userSchema, {
    fields: [friendRequestSchema.sentFromId],
    references: [userSchema.id],
  }),
  sentTo: one(userSchema, {
    fields: [friendRequestSchema.sentToId],
    references: [userSchema.id],
  }),
}));
