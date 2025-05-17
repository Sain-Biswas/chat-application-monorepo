import { boolean, date, pgTable, text } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const userSchema = pgTable("USERS", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text("NAME").notNull(),
  email: text("EMAIL").notNull().unique(),
  emailVerified: boolean("EMAIL_VERIFIED")["default"](false),
  image: text("IMAGE"),
  password: text("PASSWORD"),
  createdAt: date("CREATED_AT", { mode: "date" }).$defaultFn(() => new Date()),
  updatedAt: date("UPDATED_AT", { mode: "date" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});
