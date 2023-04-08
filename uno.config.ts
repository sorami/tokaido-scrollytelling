import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
} from "unocss";
import { extractorSvelte } from "@unocss/core";

export default defineConfig({
  extractors: [extractorSvelte],
  shortcuts: [],
  presets: [
    presetAttributify(),
    presetUno(),
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
        yuji: [
          {
            name: "Yuji Syuku",
          },
          {
            name: "serif",
            provider: "none",
          },
        ],
        roman: [
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
