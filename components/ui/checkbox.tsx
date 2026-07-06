import * as React from 'react';
import { Pressable } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Brand, useUIColors } from '@/components/ui/theme';

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({ checked, onCheckedChange, disabled }: CheckboxProps) {
  const c = useUIColors();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      className="h-[22px] w-[22px] items-center justify-center rounded-[6px] active:opacity-80"
      style={{
        opacity: disabled ? 0.5 : 1,
        backgroundColor: checked ? Brand.primary : 'transparent',
        borderWidth: 2,
        borderColor: checked ? Brand.primary : c.muted + '80',
      }}>
      {checked ? <Icon name="checkmark" size={14} color="#fff" /> : null}
    </Pressable>
  );
}
