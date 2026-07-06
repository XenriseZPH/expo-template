import { Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';

/**
 * Renders a reanimated `Animated.View` on native (so `entering`/`exiting`
 * layout animations run), and a plain `View` on web (where those layout
 * animations are unreliable). Typed as `Animated.View` so callers can always
 * pass `entering`/`exiting` — the props are simply ignored on web.
 */
export const NativeOnlyAnimatedView = (
  Platform.OS === 'web' ? View : Animated.View
) as typeof Animated.View;
