const config = {
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  printWidth: 120,
  importOrderSeparation: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/database(.*)$",
    "^@/lib(.*)$",
    "^@/components(.*)$",
    "^@/features(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["cva", "cn", "clsx"],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
