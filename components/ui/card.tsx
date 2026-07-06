import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

/**
 * Flat, border-only card matching the eGovPH design system (no shadows).
 */
export function Card({ children, className, style, ...rest }: ViewProps & { className?: string }) {
  const c = useUIColors();
  return (
    <View
      className={`rounded-[10px] p-4 ${className ?? ''}`}
      style={[{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={`gap-1 ${className ?? ''}`}>{children}</View>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ThemedText className={`text-lg ${className ?? ''}`} style={{ fontFamily: LexendFonts.semibold }}>
      {children}
    </ThemedText>
  );
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ThemedText className={`text-sm leading-5 opacity-60 ${className ?? ''}`}>{children}</ThemedText>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={`mt-3 ${className ?? ''}`}>{children}</View>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={`mt-4 flex-row items-center gap-2 ${className ?? ''}`}>{children}</View>;
}
