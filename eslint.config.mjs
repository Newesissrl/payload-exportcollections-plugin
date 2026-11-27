// ESLint flat config (ESLint >= 9). Replaces the legacy .eslintrc.json/.eslintignore.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/", "dist/", "test_usage/", "coverage/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "error",
      "no-empty-pattern": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      // Successors of the removed "@typescript-eslint/ban-types" rule.
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      // `type _react = typeof React` keeps the React import for the classic JSX runtime.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["src/components/**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["__tests__/**/*.{ts,tsx}", "__mocks__/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
);
