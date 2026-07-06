import { Pressable, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

type InputGroupProps = TextInputProps & {
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  prefix?: string;
  suffix?: string;
};

export function InputGroup({
  leftIcon,
  rightIcon,
  onRightIconPress,
  prefix,
  suffix,
  style,
  ...rest
}: InputGroupProps) {
  const c = useUIColors();

  return (
    <View
      className="flex-row items-center h-11 px-3 gap-2 rounded-[10px]"
      style={{ borderWidth: 1, borderColor: c.border, backgroundColor: c.inputBg }}>
      {leftIcon ? <Icon name={leftIcon} size={18} color={c.muted} /> : null}
      {prefix ? (
        <ThemedText className="text-sm opacity-60" style={{ fontFamily: LexendFonts.regular }}>
          {prefix}
        </ThemedText>
      ) : null}
      <TextInput
        className="flex-1"
        placeholderTextColor={c.muted + '99'}
        style={[{ color: c.text, fontFamily: LexendFonts.regular, height: '100%' }, style]}
        {...rest}
      />
      {suffix ? (
        <ThemedText className="text-sm opacity-60" style={{ fontFamily: LexendFonts.regular }}>
          {suffix}
        </ThemedText>
      ) : null}
      {rightIcon ? (
        onRightIconPress ? (
          <Pressable onPress={onRightIconPress} className="active:opacity-80">
            <Icon name={rightIcon} size={18} color={c.muted} />
          </Pressable>
        ) : (
          <Icon name={rightIcon} size={18} color={c.muted} />
        )
      ) : null}
    </View>
  );
}
