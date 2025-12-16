import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    alias: { "@": resolve(__dirname, "./src") },
    include: ["tests/components/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["tests/e2e/**/*", "node_modules/**/*"],
  },
});