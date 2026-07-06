import * as React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type ToggleOption = {
  value: string;
  label?: string;
  icon?: string;
};

type ToggleGroupProps = {
  value: string | string[];
  onValueChange: (v: any) => void;
  type?: 'single' | 'multiple';
  options: ToggleOption[];
  disabled?: boolean;
};

export function ToggleGroup({ value, onValueChange, type = 'single', options, disabled }: ToggleGroupProps) {
  const c = useUIColors();

  const isSelected = (optionValue: string) => {
    if (type === 'multiple') {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handlePress = (optionValue: string) => {
    if (type === 'multiple') {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(optionValue)) {
        onValueChange(current.filter((v) => v !== optionValue));
      } else {
        onValueChange([...current, optionValue]);
      }
      return;
    }
    onValueChange(value === optionValue ? '' : optionValue);
  };

  return (
    <View
      className="flex-row overflow-hidden rounded-[10px]"
      style={{ borderWidth: 1, borderColor: c.border, opacity: disabled ? 0.5 : 1 }}>
      {options.map((option, index) => {
        const selected = isSelected(option.value);
        const color = selected ? '#fff' : c.text;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => handlePress(option.value)}
            className="h-11 flex-1 flex-row items-center justify-center gap-2 active:opacity-80"
            style={{
              backgroundColor: selected ? Brand.primary : c.surface,
              borderLeftWidth: index > 0 ? 1 : 0,
              borderLeftColor: c.border,
            }}>
            {option.icon ? <Icon name={option.icon} size={18} color={color} /> : null}
            {option.label ? (
              <ThemedText style={{ color, fontFamily: LexendFonts.semibold }}>{option.label}</ThemedText>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
