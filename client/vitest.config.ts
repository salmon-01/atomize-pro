/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "istanbul", // or 'v8',
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage", // Directory where coverage reports will be stored
    },
  },
});
