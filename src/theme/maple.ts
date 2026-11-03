import type { PaletteTheme } from "../components/soleone/theme/head";

/**
 * This app's own theme: flag red on snow, with a forest green for right answers. Misses take a
 * darker crimson so they stay apart from the red that marks the next step; the X icon carries
 * the rest. Imported by vite.config.ts only, so the palette never ships to the browser.
 */
export const mapleTheme: PaletteTheme = {
  name: "maple",
  label: "Maple",
  toml: `mode = "light"

accent = "#D52B1E"
selection = "#F7DEDA"
muted = "#BDB3AE"

background = "#FCFBF9"
dark_background = "#F4F0EC"
darker_background = "#E9E3DE"
lighter_background = "#EFE9E4"

foreground = "#1F1A17"
dark_foreground = "#7A706B"
light_foreground = "#3D3532"
bright_foreground = "#14100E"

red = "#9B1C31"
yellow = "#C8941A"
orange = "#D0702A"
green = "#2F7A47"
cyan = "#2F8A8A"
blue = "#2C5F9E"
magenta = "#A8457A"
brown = "#7A4A2A"`,
};

/** Maple at night: the same reds on warm charcoal, brightened enough to read. */
export const mapleDarkTheme: PaletteTheme = {
  name: "maple-dark",
  label: "Maple Dark",
  toml: `mode = "dark"

accent = "#E5483A"
selection = "#3A1E1B"
muted = "#6E625D"

background = "#14110F"
dark_background = "#0F0C0B"
darker_background = "#0A0807"
lighter_background = "#201B18"

foreground = "#E4DCD5"
dark_foreground = "#8A7F78"
light_foreground = "#EEE7E0"
bright_foreground = "#FAF5F0"

red = "#D46A82"
yellow = "#D9A93A"
orange = "#DB8448"
green = "#6FB283"
cyan = "#5FAEAE"
blue = "#6F9BD1"
magenta = "#C77BA8"
brown = "#A87650"`,
};
