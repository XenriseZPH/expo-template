import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type BreadcrumbItem = {
  label: string;
  onPress?: () => void;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  const c = useUIColors();

  return (
    <View className="flex-row flex-wrap items-center gap-1.5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} className="flex-row items-center gap-1.5">
            {isLast ? (
              <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.semibold }}>
                {item.label}
              </ThemedText>
            ) : item.onPress ? (
              <Pressable onPress={item.onPress} className="active:opacity-80">
                <ThemedText className="text-sm" style={{ color: Brand.primary, fontFamily: LexendFonts.medium }}>
                  {item.label}
                </ThemedText>
              </Pressable>
            ) : (
              <ThemedText className="text-sm opacity-70">{item.label}</ThemedText>
            )}
            {!isLast ? <Icon name="chevron.right" size={14} color={c.muted} /> : null}
          </View>
        );
      })}
    </View>
  );
}
