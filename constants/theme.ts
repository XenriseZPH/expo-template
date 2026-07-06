/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

/**
 * eGovPH-inspired brand tokens (https://e.gov.ph).
 * Royal blue primary with Philippine flag yellow & red accents.
 */
export const Brand = {
  primary: '#0040e7', // royal blue
  primaryDark: '#0035c4',
  primaryDarker: '#0047ab',
  primaryLight: '#e0e9ff',
  secondary: '#f0f4ff', // pale blue surface
  accent: '#fcd116', // PH flag yellow
  accentDark: '#fac51e',
  red: '#ce1126', // PH flag red
  green: '#22c55e',
  navy: '#1a1a2e',
};

const tintColorLight = Brand.primary;
const tintColorDark = '#6b9bff';

export const Colors = {
  light: {
    text: '#1a1a2e',
    background: '#fff',
    tint: tintColorLight,
    icon: '#64748b',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#f0f4ff',
    background: '#0b1020',
    tint: tintColorDark,
    icon: '#8896b0',
    tabIconDefault: '#8896b0',
    tabIconSelected: tintColorDark,
  },
};

/** Lexend weights — the eGovPH brand typeface (loaded in app/_layout.tsx). */
export const LexendFonts = {
  regular: 'Lexend_400Regular',
  medium: 'Lexend_500Medium',
  semibold: 'Lexend_600SemiBold',
  bold: 'Lexend_700Bold',
};

export const Fonts = Platform.select({
  ios: {
    /** eGovPH brand typeface */
    sans: LexendFonts.regular,
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: LexendFonts.regular,
    serif: 'serif',
    rounded: LexendFonts.regular,
    mono: 'monospace',
  },
  web: {
    sans: "Lexend, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
