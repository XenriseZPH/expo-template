import * as React from 'react';

import { ThemedText } from '@/components/themed-text';
import { Brand, LexendFonts } from '@/components/ui/theme';

type LabelProps = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({ children, required, className }: LabelProps) {
  return (
    <ThemedText className={`text-sm${className ? ` ${className}` : ''}`} style={{ fontFamily: LexendFonts.medium }}>
      {children}
      {required ? <ThemedText style={{ color: Brand.red }}> *</ThemedText> : null}
    </ThemedText>
  );
}
