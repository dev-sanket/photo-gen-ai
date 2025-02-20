import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import reactNative from "eslint-plugin-react-native"; // ✅ Import React Native Plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "../../.eslintrc.json",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    plugins: {
      react,
      "react-native": reactNative,
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...reactNative.environments["react-native"]["react-native"],
      },

      parser: tsParser,
    },

    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "warn",
      "react-native/no-single-element-style-arrays": "warn",
    },
  },
];
