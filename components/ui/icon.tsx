import { type StyleProp, type TextStyle } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';

/**
 * Thin wrapper over IconSymbol that accepts any SF Symbol name as a string.
 * Names must exist in the MAPPING in `icon-symbol.tsx` to render on Android/web.
 */
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
  style?: StyleProp<TextStyle>;
  className?: string;
}) {
  return <IconSymbol name={name as never} size={size} color={color} style={style} className={className} />;
}
