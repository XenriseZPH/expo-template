import React, { useState } from 'react';
import { LayoutAnimation, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: number[];
};

export function Accordion({ items, type = 'single', defaultOpen = [] }: AccordionProps) {
  const c = useUIColors();
  const [open, setOpen] = useState<number[]>(defaultOpen);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => {
      const isOpen = prev.includes(index);
      if (type === 'multiple') {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      }
      return isOpen ? [] : [index];
    });
  };

  return (
    <View
      className="rounded-[10px] overflow-hidden"
      style={{ borderWidth: 1, borderColor: c.border, backgroundColor: c.surface }}
    >
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        return (
          <View
            key={index}
            style={index > 0 ? { borderTopWidth: 1, borderTopColor: c.border } : undefined}
          >
            <Pressable
              onPress={() => toggle(index)}
              className="flex-row items-center justify-between p-4 active:opacity-80"
            >
              <ThemedText style={{ fontFamily: LexendFonts.medium }}>{item.title}</ThemedText>
              <Icon
                name="chevron.down"
                size={18}
                color={c.muted}
                style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
              />
            </Pressable>
            {isOpen ? <View className="p-4 pt-0">{item.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
}
