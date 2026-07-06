import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon } from '@/components/ui/icon';
import { Brand, LexendFonts, useUIColors } from '@/components/ui/theme';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({ value, onChange }: { value?: Date; onChange?: (d: Date) => void }) {
  const c = useUIColors();
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);

  const goPrev = () => setViewDate(new Date(year, month - 1, 1));
  const goNext = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <View
      className="rounded-[10px] p-4"
      style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}>
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Pressable onPress={goPrev} className="active:opacity-80 p-1" hitSlop={8}>
          <Icon name="chevron.left" size={20} color={c.text} />
        </Pressable>
        <ThemedText style={{ fontFamily: LexendFonts.semibold }}>
          {MONTHS[month]} {year}
        </ThemedText>
        <Pressable onPress={goNext} className="active:opacity-80 p-1" hitSlop={8}>
          <Icon name="chevron.right" size={20} color={c.text} />
        </Pressable>
      </View>

      {/* Weekday row */}
      <View className="flex-row mt-3">
        {WEEKDAYS.map((w, i) => (
          <View key={i} className="flex-1 items-center">
            <ThemedText className="text-xs opacity-60">{w}</ThemedText>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View className="flex-row flex-wrap mt-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <View key={i} style={{ width: `${100 / 7}%`, height: 40 }} />;
          }
          const cellDate = new Date(year, month, day);
          const selected = value ? isSameDay(cellDate, value) : false;
          const isToday = isSameDay(cellDate, today);

          return (
            <View
              key={i}
              style={{ width: `${100 / 7}%`, height: 40 }}
              className="items-center justify-center">
              <Pressable
                onPress={() => onChange?.(new Date(year, month, day))}
                className="items-center justify-center active:opacity-80 rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: selected ? Brand.primary : 'transparent',
                }}>
                <ThemedText
                  style={{
                    color: selected ? '#fff' : isToday ? Brand.primary : undefined,
                    fontFamily: selected || isToday ? LexendFonts.semibold : LexendFonts.regular,
                  }}>
                  {day}
                </ThemedText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
