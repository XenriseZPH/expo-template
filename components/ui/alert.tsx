import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts } from '@/components/ui/theme';

type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

type AlertProps = {
  variant?: AlertVariant;
  title: string;
  description?: string;
};

const variantConfig: Record<AlertVariant, { color: string; icon: string }> = {
  info: { color: Brand.primary, icon: 'info.circle.fill' },
  success: { color: Brand.green, icon: 'checkmark.circle.fill' },
  warning: { color: Brand.accentDark, icon: 'exclamationmark.triangle.fill' },
  destructive: { color: Brand.red, icon: 'xmark.circle.fill' },
};

export function Alert({ variant = 'info', title, description }: AlertProps) {
  const { color, icon } = variantConfig[variant];

  return (
    <View
      className="flex-row gap-3 rounded-[10px] p-4"
      style={{
        borderLeftWidth: 3,
        borderLeftColor: color,
        backgroundColor: color + '14',
      }}>
      <Icon name={icon} size={20} color={color} style={{ marginTop: 1 }} />
      <View className="flex-1">
        <ThemedText style={{ color, fontFamily: LexendFonts.semibold }}>{title}</ThemedText>
        {description ? (
          <ThemedText className="text-sm opacity-70 mt-0.5">{description}</ThemedText>
        ) : null}
      </View>
    </View>
  );
}
