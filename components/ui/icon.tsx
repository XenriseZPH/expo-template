import { type StyleProp, type ViewStyle } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';

export function Icon({
  name,
  size = 24,
  color,
  style,
  className,
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  return <IconSymbol name={name} size={size} color={color} style={style} className={className} />;
}
