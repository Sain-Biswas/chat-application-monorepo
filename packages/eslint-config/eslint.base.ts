import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
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
  json.configs.recommended,
  markdown.configs.recommended
);
