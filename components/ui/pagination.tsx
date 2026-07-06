import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const WINDOW = 5;

function buildPages(page: number, pageCount: number): (number | '…')[] {
  if (pageCount <= WINDOW) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages: (number | '…')[] = [];
  let start = Math.max(1, page - Math.floor(WINDOW / 2));
  let end = start + WINDOW - 1;
  if (end > pageCount) {
    end = pageCount;
    start = end - WINDOW + 1;
  }

  for (let i = start; i <= end; i++) pages.push(i);

  // Ensure first/last with ellipsis affordance.
  if (start > 1) {
    pages[0] = 1;
    pages[1] = '…';
  }
  if (end < pageCount) {
    pages[pages.length - 1] = pageCount;
    pages[pages.length - 2] = '…';
  }

  return pages;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const c = useUIColors();
  const pages = buildPages(page, pageCount);

  const atStart = page <= 1;
  const atEnd = page >= pageCount;

  const cellClass = 'h-9 min-w-9 rounded-[10px] items-center justify-center px-2 active:opacity-80';

  return (
    <View className="flex-row items-center gap-1.5">
      <Pressable
        className={cellClass}
        disabled={atStart}
        onPress={() => onPageChange(page - 1)}
        style={{ borderWidth: 1, borderColor: c.border, opacity: atStart ? 0.4 : 1 }}>
        <Icon name="chevron.left" size={16} color={c.text} />
      </Pressable>

      {pages.map((p, index) => {
        if (p === '…') {
          return (
            <View key={`ellipsis-${index}`} className="h-9 min-w-9 items-center justify-center px-2">
              <ThemedText className="opacity-60">…</ThemedText>
            </View>
          );
        }
        const isCurrent = p === page;
        return (
          <Pressable
            key={p}
            className={cellClass}
            onPress={() => onPageChange(p)}
            style={
              isCurrent
                ? { backgroundColor: Brand.primary }
                : { borderWidth: 1, borderColor: c.border }
            }>
            <ThemedText
              className="text-sm"
              style={{
                color: isCurrent ? '#fff' : c.text,
                fontFamily: isCurrent ? LexendFonts.semibold : LexendFonts.medium,
              }}>
              {p}
            </ThemedText>
          </Pressable>
        );
      })}

      <Pressable
        className={cellClass}
        disabled={atEnd}
        onPress={() => onPageChange(page + 1)}
        style={{ borderWidth: 1, borderColor: c.border, opacity: atEnd ? 0.4 : 1 }}>
        <Icon name="chevron.right" size={16} color={c.text} />
      </Pressable>
    </View>
  );
}
