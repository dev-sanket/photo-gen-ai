import typescript from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";
import typescriptParser from "@typescript-eslint/parser";

export default {
  env: {
    node: true,
    es2021: true,
  },
  parser: typescriptParser,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import", "node"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "node/no-missing-import": "error",
    "import/no-unresolved": "error",
  },
};
