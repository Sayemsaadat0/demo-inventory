import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Treat undefined variables as warnings instead of errors
      "no-undef": "warn",
      
      // Treat unused variables as warnings instead of errors
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Treat undefined imports as warnings
      "import/no-unresolved": "warn",
      
      // Treat undefined types as warnings
      "@typescript-eslint/no-undef": "warn",
      
      // Additional rules for better development experience
      "no-console": "warn", // Warn about console.log usage
      "prefer-const": "warn", // Warn about let when const could be used
      "no-var": "warn", // Warn about var usage
    },
  },
];

export default eslintConfig;
