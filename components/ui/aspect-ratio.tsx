import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

type AspectRatioProps = {
  ratio?: number;
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function AspectRatio({ ratio = 1, children, className, style }: AspectRatioProps) {
  return (
    <View className={className} style={[{ aspectRatio: ratio, width: '100%' }, style]}>
      {children}
    </View>
  );
}
