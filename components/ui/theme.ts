import { Brand, Colors, LexendFonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export { Brand, LexendFonts };

/**
 * Resolved surface/border/text colors for the current color scheme.
 * Use this in every UI component so light/dark surfaces stay consistent
 * with the eGovPH design system (see AGENTS.md → Design System).
 */
export function useUIColors() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';
  return {
    scheme,
    isDark,
    /** Primary body text */
    text: Colors[scheme].text,
    /** Screen background */
    background: Colors[scheme].background,
    /** Muted/secondary text + icons */
    muted: Colors[scheme].icon,
    /** Brand tint (active nav, etc.) */
    tint: Colors[scheme].tint,
    /** Card / popover / sheet surface */
    surface: isDark ? '#151b2e' : '#ffffff',
    /** Hairline borders */
    border: isDark ? '#232d47' : '#e2e8f0',
    /** Input fill */
    inputBg: isDark ? '#0f1424' : '#f8faff',
    /** Pale brand-tinted surface (secondary buttons, chips) */
    tinted: isDark ? '#1a2236' : Brand.secondary,
    /** Text/icon color on top of a tinted surface */
    onTinted: isDark ? '#ffffff' : Brand.primary,
    /** Modal/overlay backdrop */
    backdrop: 'rgba(0,0,0,0.5)',
  };
}

export type UIColors = ReturnType<typeof useUIColors>;
