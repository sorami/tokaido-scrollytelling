import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [UnoCSS(), svelte()],
});
