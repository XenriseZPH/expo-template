import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { useUIColors } from '@/components/ui/theme';

type HoverCardProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

type Pos = { x: number; y: number; width: number; height: number };

export function HoverCard({ trigger, children }: HoverCardProps) {
  const c = useUIColors();
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
        {trigger}
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
              width: 260,
            }}>
            <Pressable onPress={() => {}}>
              <View
                className="rounded-[10px] p-4"
                style={{
                  backgroundColor: c.surface,
                  borderWidth: 1,
                  borderColor: c.border,
                }}>
                {children}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
