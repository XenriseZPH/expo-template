import * as React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  value: string;
  onValueChange: (v: string) => void;
  items: TabItem[];
};

export function Tabs({ value, onValueChange, items }: TabsProps) {
  const c = useUIColors();
  const active = items.find((item) => item.value === value);

  return (
    <View>
      <View className="flex-row rounded-[10px] p-1" style={{ backgroundColor: c.tinted }}>
        {items.map((item) => {
          const isActive = item.value === value;
          return (
            <Pressable
              key={item.value}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => onValueChange(item.value)}
              className="h-9 flex-1 items-center justify-center rounded-[8px] active:opacity-80"
              style={{ backgroundColor: isActive ? c.surface : 'transparent' }}>
              <ThemedText
                style={{
                  color: isActive ? c.text : c.muted,
                  fontFamily: isActive ? LexendFonts.semibold : LexendFonts.regular,
                }}>
                {item.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
      <View className="mt-3">{active?.content}</View>
    </View>
  );
}
