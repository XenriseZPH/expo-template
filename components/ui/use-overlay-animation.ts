import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated';

export type OverlayTransition = 'fade' | 'slide-up' | 'slide-left' | 'slide-right';

const OPEN: WithTimingConfig = { duration: 240 };
const CLOSE: WithTimingConfig = { duration: 200 };

/**
 * Controlled enter/exit transition driven by the `visible` prop.
 * Unlike reanimated layout animations (entering/exiting), a shared-value
 * animation plays reliably inside a React Native Modal / FullWindowOverlay.
 *
 * @param distance travel distance in px for slide transitions (screen height
 *                 for sheets, drawer width for drawers).
 */
export function useOverlayTransition(
  visible: boolean,
  type: OverlayTransition,
  distance = 400,
) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, visible ? OPEN : CLOSE);
  }, [visible, progress]);

  return useAnimatedStyle(() => {
    const p = progress.value;
    switch (type) {
      case 'slide-up':
        return { transform: [{ translateY: (1 - p) * distance }] };
      case 'slide-left':
        return { transform: [{ translateX: (1 - p) * -distance }] };
      case 'slide-right':
        return { transform: [{ translateX: (1 - p) * distance }] };
      case 'fade':
      default:
        return { opacity: p, transform: [{ translateY: (1 - p) * 8 }] };
    }
  });
}
