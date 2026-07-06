import { Dimensions, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';
import { useOverlayTransition } from '@/components/ui/use-overlay-animation';

const DRAWER_W = Math.min(Dimensions.get('window').width * 0.8, 360);

export function Drawer({
  visible,
  onClose,
  side = 'left',
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  title?: string;
  children: React.ReactNode;
}) {
  const c = useUIColors();
  const isLeft = side === 'left';
  const style = useOverlayTransition(visible, isLeft ? 'slide-left' : 'slide-right', DRAWER_W);

  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      containerStyle={{ flexDirection: 'row', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
      <Animated.View style={[{ width: DRAWER_W, height: '100%' }, style]}>
        <View
          className="p-5"
          style={{
            width: '100%',
            height: '100%',
            paddingTop: 64,
            backgroundColor: c.surface,
            ...(isLeft ? { borderRightWidth: 1 } : { borderLeftWidth: 1 }),
            borderColor: c.border,
          }}>
          <Pressable
            onPress={onClose}
            className="active:opacity-80"
            hitSlop={8}
            style={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}>
            <Icon name="xmark" size={20} color={c.muted} />
          </Pressable>
          {title ? (
            <ThemedText className="text-lg mb-4" style={{ fontFamily: LexendFonts.semibold }}>
              {title}
            </ThemedText>
          ) : null}
          {children}
        </View>
      </Animated.View>
    </Overlay>
  );
}
