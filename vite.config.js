import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-bootstrap-icons": resolve(
        __dirname,
        "node_modules/react-bootstrap-icons"
      ),
    },
  },
});
