import tseslint from "typescript-eslint";
import baseConfig from "./eslint.base";

import css from "@eslint/css";
import react from "eslint-plugin-react";

export default tseslint.config(...baseConfig, css.configs.recommended, {
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  plugins: {
    react,
  },
  languageOptions: {
    parserOptions: react.configs.recommended.parserOptions,
  },
  rules: {
    ...react.configs.recommended.rules,
  },
});
