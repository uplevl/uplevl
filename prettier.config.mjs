const config = {
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  printWidth: 120,
  importOrderSeparation: true,
  importOrder: [
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "./styles.css",
    "^@/styles(.*)$",
    "^@/database(.*)$",
    "^@/(lib|constants)(.*)$",
    "^@/(api|data)/(.*)$",
    "^@/providers(.*)$",
    "^@/hooks(.*)$",
    "^@/components(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["cva", "cn", "clsx"],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
