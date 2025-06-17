import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": "off",
      "no-undef": "error",
    },
  },
];
