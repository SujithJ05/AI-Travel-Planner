import path from "path";
import dotenv from "dotenv";
// import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

dotenv.config(); // Load environment variables from .env.local

process.env.VITE_GEOAPIFY_API_KEY =
  process.env.VITE_GEOAPIFY_API_KEY || "2910bf2a4c4e44e68fb9549029f125ce3";
console.log(
  "Fallback VITE_GEOAPIFY_API_KEY:",
  process.env.VITE_GEOAPIFY_API_KEY
);

console.log(
  "VITE_GEOAPIFY_API_KEY (dotenv):",
  process.env.VITE_GEOAPIFY_API_KEY
);
console.log("VITE_GEOAPIFY_API_KEY:", process.env.VITE_GEOAPIFY_API_KEY);
console.log("VITE_TEST_VARIABLE:", process.env.VITE_TEST_VARIABLE);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
