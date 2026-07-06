import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

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
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <Pressable
        onPress={() => {}}
        style={{
          flex: 1,
          backgroundColor: c.backdrop,
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <Pressable onPress={() => {}} style={{ width: '100%', alignItems: 'center' }}>
          <View
            className="p-5 rounded-[10px]"
            style={{
              maxWidth: 420,
              width: '100%',
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}>
            <ThemedText
              className="text-lg"
              style={{ fontFamily: LexendFonts.semibold }}>
              {title}
            </ThemedText>
            {description ? (
              <ThemedText className="opacity-70 mt-1">{description}</ThemedText>
            ) : null}
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}
