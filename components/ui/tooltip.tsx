import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/components/ui/theme';

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

type Pos = { x: number; y: number; width: number; height: number };

export function Tooltip({ children, content }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<Pos>({ x: 0, y: 0, width: 0, height: 0 });
  const ref = React.useRef<View>(null);

  const toggle = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setPos({ x, y, width, height });
      setOpen((prev) => !prev);
    });
  };

  return (
    <>
      <Pressable ref={ref} onPress={toggle}>
        {children}
      </Pressable>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <View
            style={{
              position: 'absolute',
              top: pos.y + pos.height + 6,
              left: pos.x,
              maxWidth: 240,
            }}>
            <Pressable onPress={() => {}}>
              <View className="rounded-[8px] px-3 py-2" style={{ backgroundColor: Brand.navy }}>
                <ThemedText className="text-xs" style={{ color: '#fff' }}>
                  {content}
                </ThemedText>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
