// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginPromise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          globals: globals.browser,
          parser: tseslint.parser,
          parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.node.json"],
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
      pluginPromise.configs["flat/recommended"],
      eslintConfigPrettier,
    ],
    plugins: {
      react: react,
      "react-compiler": reactCompiler,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: tseslint.parser,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        // TypeScript resolver: ensure eslint-import-resolver-typescript is installed
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
          project: ["./tsconfig.json", "./tsconfig.node.json"],
        },
        node: true,
      },
    },
  },
  storybook.configs["flat/recommended"]
);
