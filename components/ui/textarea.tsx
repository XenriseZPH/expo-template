import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type TextareaProps = TextInputProps & {
  error?: boolean;
};

export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  { error, style, ...rest },
  ref,
) {
  const c = useUIColors();
  return (
    <TextInput
      ref={ref}
      multiline
      textAlignVertical="top"
      className="p-3 rounded-[10px]"
      placeholderTextColor={c.muted + '99'}
      style={[
        {
          minHeight: 96,
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
