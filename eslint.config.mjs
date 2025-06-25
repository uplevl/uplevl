import { FlatCompat } from "@eslint/eslintrc";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import checkFile from "eslint-plugin-check-file";
import * as pluginImportX from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import * as reactCompiler from "eslint-plugin-react-compiler";
import unusedImports from "eslint-plugin-unused-imports";
import { globalIgnores } from "eslint/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:drizzle/recommended"),
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactCompiler.configs.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ignores: ["eslint.config.js"],
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
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
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
  // {
  //   plugins: {
  //     boundaries,
  //   },
  //   settings: {
  //     "boundaries/include": ["src/**/*"],
  //     "boundaries/elements": [
  //       {
  //         mode: "full",
  //         type: "app",
  //         capture: ["_", "fileName"],
  //         pattern: ["src/app/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "shared",
  //         pattern: ["src/shared/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "feature",
  //         pattern: ["src/features/*/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "database",
  //         pattern: ["src/database/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "widget",
  //         pattern: ["src/widget/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "env",
  //         pattern: ["src/env.ts"],
  //       },
  //       {
  //         mode: "full",
  //         type: "styles",
  //         pattern: ["src/styles.css"],
  //       },
  //       {
  //         mode: "full",
  //         type: "neverImport",
  //         pattern: ["src/*"],
  //       },
  //     ],
  //   },
  //   rules: {
  //     "boundaries/no-unknown": ["error"],
  //     "boundaries/no-unknown-files": ["error"],
  //     "boundaries/element-types": [
  //       "error",
  //       {
  //         default: "disallow",
  //         rules: [
  //           {
  //             from: ["*"],
  //             allow: ["env"],
  //           },
  //           {
  //             from: ["shared"],
  //             allow: ["shared", "database"],
  //           },
  //           {
  //             from: ["feature"],
  //             allow: ["shared", "database", "feature"],
  //           },
  //           {
  //             from: ["app", "neverImport"],
  //             allow: ["shared", "feature", "database", "styles"],
  //           },
  //           {
  //             from: ["database"],
  //             allow: ["database"],
  //           },
  //           {
  //             from: ["widget"],
  //             allow: ["widget", "shared", "database", "feature"],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
  globalIgnores(["**/.next/", "**/public/widget/"]),
];

export default eslintConfig;
