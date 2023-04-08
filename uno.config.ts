import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import { extractorSvelte } from "@unocss/core";

export default defineConfig({
  extractors: [extractorSvelte],
  shortcuts: [],
  presets: [presetUno()],
});
