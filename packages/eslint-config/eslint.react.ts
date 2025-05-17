import globals from "globals";
import tseslint from "typescript-eslint";
import baseConfig from "./eslint.base";

import css from "@eslint/css";
import reactQuery from "@tanstack/eslint-plugin-query";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  baseConfig,
  css.configs.recommended,
  { ignores: ["**/dist", "**/tsconfig.*.json"] },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      parserOptions: react.configs.recommended.parserOptions,
      ecmaVersion: "latest",
      globals: { ...globals.browser, ...globals.serviceworker },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
  ...reactQuery.configs["flat/recommended"],
);
