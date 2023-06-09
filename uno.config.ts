import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  presetWebFonts,
} from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import { extractorSvelte } from "@unocss/core";

export default defineConfig({
  extractors: [extractorSvelte],
  shortcuts: [],
  transformers: [transformerDirectives()],
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "google",
      fonts: {
        base: [
          {
            name: "New Tegomin",
          },
          {
            name: "serif",
            provider: "none",
          },
        ],
        roman: [
          {
            name: "Sawarabi Mincho",
            weights: ["400"],
          },
          {
            name: "serif",
            provider: "none",
          },
        ],
        yuji: [
          {
            name: "Yuji Syuku",
          },
          {
            name: "serif",
            provider: "none",
          },
        ],
        inknut: [
          {
            name: "Inknut Antiqua",
            weights: ["400"],
          },
          {
            name: "serif",
            provider: "none",
          },
        ],
      },
    }),
  ],
});
