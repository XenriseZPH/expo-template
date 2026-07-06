import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Calendar } from '@/components/ui/calendar';
import { Icon } from '@/components/ui/icon';
import { useUIColors } from '@/components/ui/theme';

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select a date',
}: {
  value?: Date;
  onChange: (d: Date) => void;
  placeholder?: string;
}) {
  const c = useUIColors();
  const [open, setOpen] = useState(false);

  const handleSelect = (d: Date) => {
    onChange(d);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className="h-11 rounded-[10px] px-3 flex-row items-center justify-between active:opacity-80"
        style={{ borderWidth: 1, borderColor: c.border, backgroundColor: c.inputBg }}>
        {value ? (
          <ThemedText>{value.toLocaleDateString()}</ThemedText>
        ) : (
          <ThemedText style={{ color: c.muted }}>{placeholder}</ThemedText>
        )}
        <Icon name="calendar" size={20} color={c.muted} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: c.backdrop }}>
          <Pressable
            onPress={() => {}}
            className="mx-6 rounded-[10px] p-3 self-stretch"
            style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}>
            <Calendar value={value} onChange={handleSelect} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
