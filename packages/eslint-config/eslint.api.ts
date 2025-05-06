import tseslint from "typescript-eslint";
import eslintBase from "./eslint.base";
import drizzleEslint from "eslint-plugin-drizzle";

export default tseslint.config(
  ...eslintBase,
  drizzleEslint.configs.recommended
);
