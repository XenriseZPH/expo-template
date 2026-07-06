import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useUIColors } from '@/components/ui/theme';

type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Separator({ orientation = 'horizontal', className, style }: SeparatorProps) {
  const c = useUIColors();
  const orientationClass = orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full';

  return (
    <View
      className={`${orientationClass}${className ? ` ${className}` : ''}`}
      style={[{ backgroundColor: c.border }, style]}
    />
  );
}
