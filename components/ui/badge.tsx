import { View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type BadgeVariant = 'default' | 'secondary' | 'accent' | 'destructive' | 'outline';

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const c = useUIColors();

  let containerStyle: ViewStyle = {};
  let color = '#fff';

  switch (variant) {
    case 'default':
      containerStyle = { backgroundColor: Brand.primary };
      color = '#fff';
      break;
    case 'secondary':
      containerStyle = { backgroundColor: c.tinted };
      color = c.onTinted;
      break;
    case 'accent':
      containerStyle = { backgroundColor: Brand.accent };
      color = Brand.navy;
      break;
    case 'destructive':
      containerStyle = { backgroundColor: Brand.red };
      color = '#fff';
      break;
    case 'outline':
      containerStyle = { backgroundColor: 'transparent', borderWidth: 1, borderColor: Brand.primary + '66' };
      color = c.isDark ? '#fff' : Brand.navy;
      break;
  }

  return (
    <View className="rounded-full px-3 py-1 self-start" style={containerStyle}>
      <ThemedText className="text-xs" style={{ color, fontFamily: LexendFonts.semibold }}>
        {children}
      </ThemedText>
    </View>
  );
}
