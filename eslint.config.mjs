import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import checkFile from "eslint-plugin-check-file";
import * as pluginImportX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import * as reactCompiler from "eslint-plugin-react-compiler";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import * as tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/", "**/public/widget/"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  jsxA11y.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactCompiler.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ignores: ["eslint.config.mjs"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          // ignore the middle extensions of the filename to support filename like babel.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // all folders within src (except __tests__)should be named in kebab-case
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],
    },
  },
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message: "Default `React` import is not necessary with React 17+",
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "func-style": ["error", "declaration"],
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  globalIgnores(["**/dist/", "**/public/widget/"]),
);
