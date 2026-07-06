import { Pressable, View } from 'react-native';
import { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

export function Dialog({
  visible,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const c = useUIColors();
  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      containerStyle={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <NativeOnlyAnimatedView
        entering={FadeIn.duration(200).reduceMotion(ReduceMotion.System)}
        exiting={FadeOut.duration(160).reduceMotion(ReduceMotion.System)}
        style={{ width: '100%', maxWidth: 420 }}>
        <View
          className="p-5 rounded-[10px]"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}>
          <View className="flex-row items-start justify-between">
            {title ? (
              <ThemedText className="text-lg flex-1" style={{ fontFamily: LexendFonts.semibold }}>
                {title}
              </ThemedText>
            ) : (
              <View className="flex-1" />
            )}
            <Pressable onPress={onClose} className="active:opacity-80 ml-3" hitSlop={8}>
              <Icon name="xmark" size={20} color={c.muted} />
            </Pressable>
          </View>
          {description ? <ThemedText className="opacity-70 mt-1">{description}</ThemedText> : null}
          {children ? <View className="mt-3">{children}</View> : null}
          {footer ? <View className="mt-5 flex-row justify-end gap-2">{footer}</View> : null}
        </View>
      </NativeOnlyAnimatedView>
    </Overlay>
  );
}
