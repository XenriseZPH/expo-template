import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { useUIColors } from '@/components/ui/theme';

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

type Pos = { x: number; y: number; width: number; height: number };

export function Popover({ trigger, children }: PopoverProps) {
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
      <Pressable ref={ref} onPress={toggle} className="active:opacity-80">
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
              minWidth: pos.width,
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
            className="overflow-hidden rounded-[10px]">
            <Pressable onPress={() => {}} className="p-3">
              {children}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
