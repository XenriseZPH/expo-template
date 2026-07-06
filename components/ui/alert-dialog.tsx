import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Overlay } from '@/components/ui/overlay';
import { LexendFonts, useUIColors } from '@/components/ui/theme';
import { useOverlayTransition } from '@/components/ui/use-overlay-animation';

export function AlertDialog({
  visible,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  destructive,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  const c = useUIColors();
  const style = useOverlayTransition(visible, 'fade');
  return (
    <Overlay
      visible={visible}
      onClose={onClose}
      dismissOnBackdrop={false}
      containerStyle={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <Animated.View style={[{ width: '100%', maxWidth: 420 }, style]}>
        <View
          className="p-5 rounded-[10px]"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}>
          <ThemedText className="text-lg" style={{ fontFamily: LexendFonts.semibold }}>
            {title}
          </ThemedText>
          {description ? <ThemedText className="opacity-70 mt-1">{description}</ThemedText> : null}
          <View className="mt-5 flex-row justify-end gap-2">
            <Button variant="outline" onPress={onClose}>
              {cancelText ?? 'Cancel'}
            </Button>
            <Button
              variant={destructive ? 'destructive' : 'default'}
              onPress={() => {
                onConfirm();
                onClose();
              }}>
              {confirmText ?? 'Confirm'}
            </Button>
          </View>
        </View>
      </Animated.View>
    </Overlay>
  );
}
