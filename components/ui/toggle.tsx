import * as React from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

type ToggleProps = {
  pressed: boolean;
  onPressedChange: (v: boolean) => void;
  children?: React.ReactNode;
  icon?: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  disabled?: boolean;
};

export function Toggle({
  pressed,
  onPressedChange,
  children,
  icon,
  variant = 'default',
  size = 'md',
  disabled,
}: ToggleProps) {
  const c = useUIColors();
  const color = pressed ? c.onTinted : c.text;
  const sizeClass = size === 'sm' ? 'h-9 px-2.5' : 'h-11 px-3';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled }}
      disabled={disabled}
      onPress={() => onPressedChange(!pressed)}
      className={`flex-row items-center justify-center gap-2 rounded-[10px] active:opacity-80 ${sizeClass}`}
      style={{
        opacity: disabled ? 0.5 : 1,
        backgroundColor: pressed ? c.tinted : 'transparent',
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: variant === 'outline' ? c.border : undefined,
      }}>
      {icon ? <Icon name={icon} size={18} color={color} /> : null}
      {typeof children === 'string' ? (
        <ThemedText style={{ color, fontFamily: LexendFonts.semibold }}>{children}</ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
}
