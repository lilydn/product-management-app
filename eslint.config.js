import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import a11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],

    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    settings: {
      react: { version: "detect" },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": a11y,
      prettier,
      import: importPlugin,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      // react & hooks rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // prettier integration
      "prettier/prettier": "error",

      // code style adjustments
      semi: ["error", "always"],
      "comma-dangle": ["error", "only-multiline"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "arrow-body-style": "off",
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "import/prefer-default-export": "off",
      "import/no-unresolved": "off",

      // accessibility tweaks
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "warn",

      // support for React Refresh (Vite's fast reload)
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },

    overrides: [
      // jest/test files preparation
      {
        files: ["**/?(*.)+(spec|test).[jt]s?(x)", "jest.setup.js"],
        extends: [
          "plugin:jest/recommended",
          "plugin:jest-dom/recommended",
          "plugin:testing-library/react",
        ],
        rules: {
          "jest/no-disabled-tests": "warn",
          "jest/no-focused-tests": "error",
          "jest/no-identical-title": "error",
          "jest/prefer-to-have-length": "warn",
          "jest/valid-expect": "error",
          "jest/expect-expect": "off",
        },
      },
    ],
  }
);
