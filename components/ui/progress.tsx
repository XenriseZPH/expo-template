import { View } from 'react-native';

import { Brand, useUIColors } from '@/components/ui/theme';

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const c = useUIColors();
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <View
      className={`h-2 rounded-full w-full overflow-hidden${className ? ` ${className}` : ''}`}
      style={{ backgroundColor: c.muted + '22' }}>
      <View className="h-full rounded-full" style={{ backgroundColor: Brand.primary, width: `${clamped}%` }} />
    </View>
  );
}
