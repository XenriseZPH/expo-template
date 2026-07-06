import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
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
          flexDirection: 'row',
          justifyContent: isLeft ? 'flex-start' : 'flex-end',
        }}>
        <Pressable
          onPress={() => {}}
          style={{ width: '80%', maxWidth: 360, height: '100%' }}>
          <View
            className="p-5"
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 64,
              backgroundColor: c.surface,
              ...(isLeft
                ? { borderRightWidth: 1 }
                : { borderLeftWidth: 1 }),
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
              <ThemedText
                className="text-lg mb-4"
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
