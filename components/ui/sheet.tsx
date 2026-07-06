import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: c.backdrop,
          justifyContent: 'flex-end',
        }}>
        <Pressable onPress={() => {}} style={{ width: '100%' }}>
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
              <ThemedText
                className="text-lg mb-3"
                style={{ fontFamily: LexendFonts.semibold }}>
                {title}
              </ThemedText>
            ) : null}
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
