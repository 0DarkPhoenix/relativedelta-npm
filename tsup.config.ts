import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	clean: true,
	minify: true,
	sourcemap: true,
	external: ["@types/node"],
	esbuildOptions(options) {
		options.platform = "node";
	},
});
