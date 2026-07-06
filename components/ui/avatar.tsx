import { Image, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

type AvatarProps = {
  source?: { uri: string };
  fallback?: string;
  size?: number;
};

export function Avatar({ source, fallback, size = 40 }: AvatarProps) {
  const c = useUIColors();
  const initials = (fallback ?? '').toUpperCase().slice(0, 2);

  return (
    <View className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
      {source ? (
        <Image source={source} style={{ width: size, height: size }} />
      ) : (
        <View
          className="items-center justify-center"
          style={{ width: size, height: size, backgroundColor: c.tinted }}>
          <ThemedText style={{ color: c.onTinted, fontFamily: LexendFonts.semibold, fontSize: size * 0.4 }}>
            {initials}
          </ThemedText>
        </View>
      )}
    </View>
  );
}
