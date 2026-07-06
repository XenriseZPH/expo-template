import { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { useUIColors } from '@/components/ui/theme';

const isIOS = Platform.OS === 'ios';
/** How long to keep the host mounted after `visible` flips false so exit animations play. */
const EXIT_MS = 260;

type OverlayProps = {
  visible: boolean;
  onClose: () => void;
  /** Alignment of the content within the screen (center / flex-end / row, etc). */
  containerStyle?: ViewStyle;
  /** Tapping the backdrop closes the overlay (default true). */
  dismissOnBackdrop?: boolean;
  /** The animated content node (supplies its own entering/exiting). */
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

  useEffect(() => {
    if (visible) {
      setRendered(true);
      return;
    }
    const t = setTimeout(() => setRendered(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [visible]);

  if (!rendered) return null;

  const inner = visible ? (
    <>
      <NativeOnlyAnimatedView
        entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
        exiting={FadeOut.duration(180).reduceMotion(ReduceMotion.System)}
        style={[StyleSheet.absoluteFill, { backgroundColor: c.backdrop }]}>
        {dismissOnBackdrop ? (
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        ) : null}
      </NativeOnlyAnimatedView>
      <View pointerEvents="box-none" style={[{ flex: 1 }, containerStyle]}>
        {children}
      </View>
    </>
  ) : null;

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
