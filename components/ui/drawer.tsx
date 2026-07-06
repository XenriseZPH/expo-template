import { Pressable, View } from 'react-native';
import {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  ReduceMotion,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

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
  const entering = (isLeft ? SlideInLeft : SlideInRight)
    .duration(280)
    .reduceMotion(ReduceMotion.System);
  const exiting = (isLeft ? SlideOutLeft : SlideOutRight)
    .duration(240)
    .reduceMotion(ReduceMotion.System);

  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      containerStyle={{ flexDirection: 'row', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
      <NativeOnlyAnimatedView
        entering={entering}
        exiting={exiting}
        style={{ width: '80%', maxWidth: 360, height: '100%' }}>
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
      </NativeOnlyAnimatedView>
    </Overlay>
  );
}
