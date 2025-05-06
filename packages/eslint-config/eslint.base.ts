import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import stylistic from "@stylistic/eslint-plugin";
import unicornEslint from "eslint-plugin-unicorn";

export default tseslint.config(
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...js.configs.recommended.rules,
      "array-callback-return": [
        "error",
        {
          allowImplicit: true,
          checkForEach: true,
        },
      ],
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "warn",
      "no-unreachable-loop": "warn",
      "no-use-before-define": "warn",
      "no-useless-assignment": "warn",
      "arrow-body-style": ["error", "as-needed"],
      "capitalized-comments": ["warn"],
      camelcase: "error",
      curly: ["error", "multi"],
      "default-case": "error",
      "default-case-last": "error",
      "dot-notation": ["error", { allowKeywords: false }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-console": "warn",
      "no-empty-function": "warn",
      "no-alert": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "warn",
      "prefer-template": "error",
      "require-await": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.json"],
    ignores: ["**/package-lock.json", "**/tsconfig.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.jsonc", "**/tsconfig.json"],
    language: "json/jsonc",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.json5"],
    language: "json/json5",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "error",
    },
    extends: [markdown.configs.recommended],
  },
  prettier,
  stylistic.configs.customize({
    semi: true,
    jsx: true,
    quotes: "double",
    indent: 2,
    arrowParens: true,
  }),
  unicornEslint.configs.recommended
);
