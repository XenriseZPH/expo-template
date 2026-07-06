import { Text, type TextProps } from 'react-native';

import { LexendFonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const typeClasses: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-base leading-6',
  defaultSemiBold: 'text-base leading-6 font-semibold',
  title: 'text-3xl font-bold leading-9',
  subtitle: 'text-xl font-bold',
  link: 'text-base leading-[30px] text-brand',
};

// Custom fonts don't synthesize weights, so map each type to its Lexend file.
const typeFont: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: LexendFonts.regular,
  defaultSemiBold: LexendFonts.semibold,
  title: LexendFonts.bold,
  subtitle: LexendFonts.bold,
  link: LexendFonts.medium,
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      className={`${typeClasses[type]} ${className ?? ''}`}
      style={[{ color, fontFamily: typeFont[type] }, style]}
      {...rest}
    />
  );
}
