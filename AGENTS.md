# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# Styling

Use NativeWind (Tailwind CSS for React Native). Style components using `className` with Tailwind utility classes. Do not use `StyleSheet.create` or inline `style` props unless absolutely necessary for dynamic styles that can't be expressed with Tailwind. Reference https://www.nativewind.dev for available utilities.

# Design System (eGovPH)

All new UI must follow the eGovPH-inspired design system (royal blue with Philippine flag accents, Lexend typeface). The reference implementation lives in `app/design-system.tsx` — study it before building new screens or components.

## Tokens

Color tokens are defined in `tailwind.config.js` (utility classes) and mirrored in `constants/theme.ts` as the `Brand` object (for use in dynamic `style` props). Never hardcode raw hex like `#0a7ea4`, `bg-blue-500`, or `text-gray-500` — always use the tokens.

- **Primary**: `bg-brand` / `text-brand` / `Brand.primary` — royal blue `#0040e7`. Pressed state: `Brand.primaryDark`. Tinted surface: `bg-brand-tint` (`Brand.secondary`, `#f0f4ff`).
- **Accent**: `bg-accent` / `Brand.accent` — Philippine flag yellow `#fcd116`. Text on accent must be navy.
- **Destructive**: `bg-ph-red` / `Brand.red` — Philippine flag red `#ce1126`. Used for delete/sign-out.
- **Foreground**: `text-navy` / `Brand.navy` (`#1a1a2e`) on light. Muted text via `opacity-60`/`opacity-70`.

## Typography

Use the `ThemedText` component (`components/themed-text.tsx`) for all text — it applies the correct Lexend weight and theme color automatically. Use `type="title" | "subtitle" | "defaultSemiBold" | "link"` for hierarchy. Lexend weights are also exposed as `LexendFonts` in `constants/theme.ts` when a specific weight is needed via `style`.

## Conventions

- **Radius**: cards, buttons, and inputs use `rounded-[10px]` (the eGovPH `--radius`). Pills/badges use `rounded-full`.
- **Cards**: background `#fff` (light) / `#151b2e` (dark), `borderWidth: 1` with border `#e2e8f0` (light) / `#232d47` (dark). **No shadows** — flat, border-only.
- **Inputs**: `rounded-[10px]` border, fill `#f8faff` (light) / `#0f1424` (dark).
- **Screen backgrounds**: use `Colors[colorScheme].background` — `#fff` (light) / `#0b1020` navy (dark).
- **Pressable feedback**: add `active:opacity-80`.

### Spacing

Follow the rhythm established in `app/(tabs)/explore.tsx` (Profile screen):

- **Screen horizontal padding**: `px-6` on the root screen container.
- **Screen header**: `pt-16 pb-6` (holds the `type="title"` heading).
- **Between sections / stacked cards**: `mt-4`.
- **Card / row internal padding**: `p-4`.
- **Gaps inside a card and between side-by-side tiles**: `gap-3`.

- **Text color on colored fills**: NativeWind's `style` prop overrides `className`, and `ThemedText` sets color via `style`. So on dark fills (brand blue, red) pass the text color explicitly via `style={{ color: '#fff' }}` — a `text-white` className will be silently overridden.
- Always support light and dark mode via the `useColorScheme` hook.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
