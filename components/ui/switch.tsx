import * as React from 'react';
import { Switch as RNSwitch } from 'react-native';

import { Brand, useUIColors } from '@/components/ui/theme';

type SwitchProps = {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
};

export function Switch({ value, onValueChange, disabled }: SwitchProps) {
  const c = useUIColors();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: c.muted + '40', true: Brand.primary }}
      thumbColor="#fff"
      ios_backgroundColor={c.muted + '40'}
    />
  );
}
