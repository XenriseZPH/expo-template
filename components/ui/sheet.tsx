import { View } from 'react-native';
import { SlideInDown, SlideOutDown, ReduceMotion } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

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
  return (
    <Overlay visible={visible} onClose={onClose} containerStyle={{ justifyContent: 'flex-end' }}>
      <NativeOnlyAnimatedView
        entering={SlideInDown.duration(260).reduceMotion(ReduceMotion.System)}
        exiting={SlideOutDown.duration(220).reduceMotion(ReduceMotion.System)}
        style={{ width: '100%' }}>
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
      </NativeOnlyAnimatedView>
    </Overlay>
  );
}
