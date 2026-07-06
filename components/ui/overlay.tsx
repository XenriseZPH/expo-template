import { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

import { useUIColors } from '@/components/ui/theme';

const isIOS = Platform.OS === 'ios';
/** How long to keep the host mounted after `visible` flips false so exit animations play. */
const EXIT_MS = 240;

type OverlayProps = {
  visible: boolean;
  onClose: () => void;
  /** Alignment of the content within the screen (center / flex-end / row, etc). */
  containerStyle?: ViewStyle;
  /** Tapping the backdrop closes the overlay (default true). */
  dismissOnBackdrop?: boolean;
  /** The animated content node (supplies its own transition). */
  children: React.ReactNode;
};

export function Overlay({
  visible,
  onClose,
  containerStyle,
  dismissOnBackdrop = true,
  children,
}: OverlayProps) {
  const c = useUIColors();
  const [rendered, setRendered] = useState(visible);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) setRendered(true);
    progress.value = withTiming(visible ? 1 : 0, { duration: visible ? 200 : EXIT_MS });
    if (!visible) {
      const t = setTimeout(() => setRendered(false), EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [visible, progress]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  if (!rendered) return null;

  const inner = (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: c.backdrop }, backdropStyle]}>
        {dismissOnBackdrop ? (
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        ) : null}
      </Animated.View>
      <View pointerEvents="box-none" style={[{ flex: 1 }, containerStyle]}>
        {children}
      </View>
    </>
  );

  if (isIOS) {
    return <RNFullWindowOverlay>{inner}</RNFullWindowOverlay>;
  }

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      {inner}
    </Modal>
  );
}
