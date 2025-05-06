declare module "eslint-plugin-drizzle" {
  export const configs: {
    recommended: import("eslint").Linter.FlatConfig;
  };
}
