import React, { useMemo, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  View,
} from 'react-native';

import { Brand, useUIColors } from '@/components/ui/theme';

export type SliderProps = {
  value: number;
  onValueChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const THUMB_SIZE = 22;

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps) {
  const c = useUIColors();
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);

  const clampAndSnap = (raw: number) => {
    let v = Math.round((raw - min) / step) * step + min;
    v = Math.max(min, Math.min(max, v));
    return v;
  };

  const updateFromX = (x: number) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const ratio = Math.max(0, Math.min(1, x / w));
    const raw = min + ratio * (max - min);
    onValueChange(clampAndSnap(raw));
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (e: GestureResponderEvent) => {
          updateFromX(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e: GestureResponderEvent) => {
          updateFromX(e.nativeEvent.locationX);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, min, max, step, onValueChange]
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  const percent = max === min ? 0 : (Math.max(min, Math.min(max, value)) - min) / (max - min);
  const thumbLeft = percent * width - THUMB_SIZE / 2;

  return (
    <View
      onLayout={onLayout}
      className="justify-center"
      style={{ height: THUMB_SIZE, opacity: disabled ? 0.5 : 1 }}
      {...panResponder.panHandlers}
    >
      <View className="rounded-full" style={{ height: 6, backgroundColor: c.muted + '33' }}>
        <View
          className="rounded-full"
          style={{
            height: 6,
            width: `${percent * 100}%`,
            backgroundColor: Brand.primary,
          }}
        />
      </View>
      <View
        className="rounded-full absolute"
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          left: thumbLeft,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: Brand.primary,
        }}
      />
    </View>
  );
}
