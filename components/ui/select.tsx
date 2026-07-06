import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, useUIColors } from '@/components/ui/theme';

type Option = { label: string; value: string };

type SelectProps = {
  value?: string;
  onValueChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

type Pos = { x: number; y: number; width: number; height: number };

export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  disabled = false,
}: SelectProps) {
  const c = useUIColors();
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<Pos>({ x: 0, y: 0, width: 0, height: 0 });
  const ref = React.useRef<View>(null);

  const selected = options.find((o) => o.value === value);

  const openMenu = () => {
    if (disabled) return;
    ref.current?.measureInWindow((x, y, width, height) => {
      setPos({ x, y, width, height });
      setOpen(true);
    });
  };

  const select = (v: string) => {
    setOpen(false);
    onValueChange(v);
  };

  return (
    <>
      <Pressable
        ref={ref}
        onPress={openMenu}
        disabled={disabled}
        style={{
          backgroundColor: c.inputBg,
          borderWidth: 1,
          borderColor: c.border,
          opacity: disabled ? 0.5 : 1,
        }}
        className="h-11 flex-row items-center justify-between rounded-[10px] px-3 active:opacity-80">
        <ThemedText style={{ color: selected ? c.text : c.muted }} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </ThemedText>
        <Icon name="chevron.up.chevron.down" size={16} color={c.muted} />
      </Pressable>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable
          className="flex-1"
          style={{ backgroundColor: c.backdrop }}
          onPress={() => setOpen(false)}>
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
            <Pressable onPress={() => {}}>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => select(option.value)}
                    className="flex-row items-center justify-between px-3 py-3 active:opacity-80">
                    <ThemedText style={{ color: c.text }}>{option.label}</ThemedText>
                    {isSelected ? (
                      <Icon name="checkmark" size={16} color={Brand.primary} />
                    ) : null}
                  </Pressable>
                );
              })}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
