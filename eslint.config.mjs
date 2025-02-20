export default [
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    plugins: {
      react: require("eslint-plugin-react"),
      "react-native": require("eslint-plugin-react-native"),
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
