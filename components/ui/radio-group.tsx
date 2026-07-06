import * as React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, useUIColors } from '@/components/ui/theme';

type RadioGroupContextValue = {
  value: string;
  onValueChange: (v: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

type RadioGroupProps = {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
};

export function RadioGroup({ value, onValueChange, children }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View>{children}</View>
    </RadioGroupContext.Provider>
  );
}

type RadioGroupItemProps = {
  value: string;
  label?: string;
  disabled?: boolean;
};

export function RadioGroupItem({ value, label, disabled }: RadioGroupItemProps) {
  const c = useUIColors();
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const selected = ctx.value === value;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={() => ctx.onValueChange(value)}
      className="flex-row items-center gap-2 active:opacity-80"
      style={{ opacity: disabled ? 0.5 : 1 }}>
      <View
        className="h-5 w-5 items-center justify-center rounded-full"
        style={{
          borderWidth: 2,
          borderColor: selected ? Brand.primary : c.muted + '80',
        }}>
        {selected ? (
          <View className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: Brand.primary }} />
        ) : null}
      </View>
      {label ? <ThemedText>{label}</ThemedText> : null}
    </Pressable>
  );
}
