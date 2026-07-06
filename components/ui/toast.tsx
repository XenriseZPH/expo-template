import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type ToastVariant = 'info' | 'success' | 'warning' | 'destructive';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = ToastOptions & { id: number };

const VARIANT_META: Record<ToastVariant, { color: string; icon: string }> = {
  info: { color: Brand.primary, icon: 'info.circle.fill' },
  success: { color: Brand.green, icon: 'checkmark.circle.fill' },
  warning: { color: Brand.accentDark, icon: 'exclamationmark.triangle.fill' },
  destructive: { color: Brand.red, icon: 'xmark.circle.fill' },
};

let counter = 0;

type ToastContextValue = { toast: (opts: ToastOptions) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const c = useUIColors();
  const meta = VARIANT_META[item.variant ?? 'info'];

  return (
    <View
      className="w-full rounded-[10px] p-4 flex-row items-start gap-3"
      style={{
        maxWidth: 420,
        backgroundColor: c.surface,
        borderWidth: 1,
        borderColor: c.border,
        borderLeftWidth: 3,
        borderLeftColor: meta.color,
      }}>
      <Icon name={meta.icon} size={20} color={meta.color} style={{ marginTop: 2 }} />
      <View className="flex-1">
        <ThemedText style={{ fontFamily: LexendFonts.semibold }}>{item.title}</ThemedText>
        {item.description ? (
          <ThemedText className="opacity-70 text-sm mt-0.5">{item.description}</ThemedText>
        ) : null}
      </View>
      <Pressable onPress={onClose} className="active:opacity-80" hitSlop={8}>
        <Icon name="xmark" size={18} color={c.muted} />
      </Pressable>
    </View>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = ++counter;
      const item: ToastItem = { ...opts, id };
      setToasts((prev) => [...prev, item]);
      const duration = opts.duration ?? 3000;
      setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View
        pointerEvents="box-none"
        className="px-4 gap-2"
        style={{ position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' }}>
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onClose={() => remove(t.id)} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}
