import { Dimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';
import { useOverlayTransition } from '@/components/ui/use-overlay-animation';

const SCREEN_H = Dimensions.get('window').height;

export function Sheet({
  visible,
  onClose,
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const c = useUIColors();
  const style = useOverlayTransition(visible, 'slide-up', SCREEN_H);

  return (
    <Overlay visible={visible} onClose={onClose} containerStyle={{ justifyContent: 'flex-end' }}>
      <Animated.View style={[{ width: '100%' }, style]}>
        <View
          className="rounded-t-[16px] p-5"
          style={{
            width: '100%',
            paddingBottom: 32,
            backgroundColor: c.surface,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: c.border,
          }}>
          <View
            className="w-10 h-1 rounded-full mb-4"
            style={{ alignSelf: 'center', backgroundColor: c.border }}
          />
          {title ? (
            <ThemedText className="text-lg mb-3" style={{ fontFamily: LexendFonts.semibold }}>
              {title}
            </ThemedText>
          ) : null}
          {children}
        </View>
      </Animated.View>
    </Overlay>
  );
}
