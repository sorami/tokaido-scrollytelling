import { defineConfig, presetAttributify, presetUno } from "unocss";
import { extractorSvelte } from "@unocss/core";

export default defineConfig({
  extractors: [extractorSvelte],
  shortcuts: [],
  presets: [presetAttributify(), presetUno()],
});
