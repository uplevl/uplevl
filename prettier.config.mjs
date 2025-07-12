const config = {
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  printWidth: 120,
  importOrderSeparation: true,
  importOrder: [
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "^@/database(.*)$",
    "^@/(lib|constants|hooks)(.*)$",
    "^@/data(.*)$",
    "^@/(agents|automations)(.*)$",
    "^@/components(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["cva", "cn", "clsx"],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
