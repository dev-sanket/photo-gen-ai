import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";

export default [
  {
    ignores: ["node_modules/*", "dist/*"],
    files: ["**/*.ts", "**/*.cts", "**.*.mts"],
  },
  {
    plugins: {
      react,
      "react-native": reactNative,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "react/jsx-uses-react": "error",
    },
  },
];
