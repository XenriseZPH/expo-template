import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, useUIColors } from '@/components/ui/theme';

type ContextMenuItem = {
  label: string;
  icon?: string;
  destructive?: boolean;
  onPress: () => void;
};

type ContextMenuProps = {
  trigger: React.ReactNode;
  items: ContextMenuItem[];
};

type Pos = { x: number; y: number; width: number; height: number };

export function ContextMenu({ trigger, items }: ContextMenuProps) {
  const c = useUIColors();
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<Pos>({ x: 0, y: 0, width: 0, height: 0 });
  const ref = React.useRef<View>(null);

  const openMenu = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setPos({ x, y, width, height });
      setOpen(true);
    });
  };

  const select = (onPress: () => void) => {
    setOpen(false);
    onPress();
  };

  return (
    <>
      <View ref={ref} collapsable={false} className="self-start">
        {React.isValidElement(trigger)
          ? React.cloneElement(trigger as React.ReactElement<any>, {
              onLongPress: () => {
                (trigger as any)?.props?.onLongPress?.();
                openMenu();
              },
            })
          : trigger}
      </View>
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
              minWidth: 180,
              paddingVertical: 4,
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
            className="rounded-[10px]">
            <Pressable onPress={() => {}}>
              {items.map((item, index) => (
                <Pressable
                  key={`${item.label}-${index}`}
                  onPress={() => select(item.onPress)}
                  className="flex-row items-center gap-2 px-3 py-2.5 active:opacity-80">
                  {item.icon ? (
                    <Icon
                      name={item.icon}
                      size={16}
                      color={item.destructive ? Brand.red : c.muted}
                    />
                  ) : null}
                  <ThemedText style={{ color: item.destructive ? Brand.red : c.text }}>
                    {item.label}
                  </ThemedText>
                </Pressable>
              ))}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
