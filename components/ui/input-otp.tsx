import React, { useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

export type InputOTPProps = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
};

export function InputOTP({ length = 6, value, onChange, autoFocus }: InputOTPProps) {
  const c = useUIColors();
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, length);
    onChange(digits);
  };

  const focus = () => inputRef.current?.focus();

  return (
    <Pressable onPress={focus}>
      <View className="flex-row gap-2">
        {Array.from({ length }).map((_, i) => {
          const char = value[i] ?? '';
          const isActive = i === value.length;
          return (
            <View
              key={i}
              className="rounded-[10px] items-center justify-center"
              style={{
                width: 44,
                height: 52,
                borderWidth: 1,
                borderColor: isActive ? Brand.primary : c.border,
                backgroundColor: c.inputBg,
              }}
            >
              <ThemedText className="text-xl" style={{ fontFamily: LexendFonts.semibold }}>
                {char}
              </ThemedText>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        className="absolute inset-0"
        style={{ opacity: 0 }}
      />
    </Pressable>
  );
}
