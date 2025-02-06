import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: { preserveSymlinks: true }, // Preserve symlink paths
	define: {
		"process.env": {},
	}
});
