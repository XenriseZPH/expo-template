import { useState } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonProps = PressableProps & {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** SF Symbol name rendered before the label */
  icon?: string;
  loading?: boolean;
  className?: string;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3',
  md: 'h-11 px-4',
  lg: 'h-14 px-5',
  icon: 'h-11 w-11',
};

const textSize: Record<ButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  icon: 'text-sm',
};

export function Button({
  children,
  variant = 'default',
  size = 'md',
  icon,
  loading,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const c = useUIColors();

  const variants: Record<ButtonVariant, { bg: string; color: string; pressed: string; border?: string }> = {
    default: { bg: Brand.primary, color: '#fff', pressed: Brand.primaryDark },
    secondary: { bg: c.tinted, color: c.onTinted, pressed: c.isDark ? '#232d47' : Brand.primaryLight },
    accent: { bg: Brand.accent, color: Brand.navy, pressed: Brand.accentDark },
    outline: { bg: 'transparent', color: c.isDark ? '#fff' : Brand.primary, pressed: c.tinted, border: Brand.primary },
    ghost: { bg: 'transparent', color: c.isDark ? '#fff' : Brand.primary, pressed: c.tinted },
    destructive: { bg: Brand.red, color: '#fff', pressed: '#a50e1f' },
  };

  const v = variants[variant];
  const isDisabled = disabled || loading;
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-row items-center justify-center gap-2 rounded-[10px] ${sizeClasses[size]} ${className ?? ''}`}
      style={[
        v.border ? { borderWidth: 1.5, borderColor: v.border } : null,
        { backgroundColor: pressed ? v.pressed : v.bg, opacity: isDisabled ? 0.5 : 1 },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.color} />
      ) : (
        <>
          {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} color={v.color} /> : null}
          {typeof children === 'string' ? (
            <ThemedText className={textSize[size]} style={{ color: v.color, fontFamily: LexendFonts.semibold }}>
              {children}
            </ThemedText>
          ) : (
            children
          )}
        </>
      )}
    </Pressable>
  );
}

/** Groups buttons with shared borders / spacing. Pass Button children. */
export function ButtonGroup({
  children,
  className,
  attached = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** When true, buttons are joined edge-to-edge (segmented look). */
  attached?: boolean;
}) {
  return (
    <View className={`flex-row items-center ${attached ? '' : 'gap-2'} ${className ?? ''}`}>
      {children}
    </View>
  );
}
