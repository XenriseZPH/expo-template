import { forwardRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type InputProps = TextInputProps & {
  error?: boolean;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { error, style, ...rest },
  ref,
) {
  const c = useUIColors();
  return (
    <TextInput
      ref={ref}
      className="h-11 px-3 rounded-[10px]"
      placeholderTextColor={c.muted + '99'}
      style={[
        {
          borderWidth: 1,
          borderColor: error ? Brand.red : c.border,
          backgroundColor: c.inputBg,
          color: c.text,
          fontFamily: LexendFonts.regular,
        },
        style,
      ]}
      {...rest}
    />
  );
});

type FieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function Field({ label, hint, error, required, children }: FieldProps) {
  return (
    <View className="gap-1.5">
      {label ? (
        <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>
          {label}
          {required ? <ThemedText style={{ color: Brand.red }}> *</ThemedText> : null}
        </ThemedText>
      ) : null}
      {children}
      {error ? (
        <ThemedText className="text-xs" style={{ color: Brand.red }}>
          {error}
        </ThemedText>
      ) : hint ? (
        <ThemedText className="text-xs opacity-60">{hint}</ThemedText>
      ) : null}
    </View>
  );
}
