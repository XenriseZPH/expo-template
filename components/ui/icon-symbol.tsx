import { HugeiconsIcon } from '@hugeicons/react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import {
  Home01Icon,
  Airplane01Icon,
  CodeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UnfoldMoreIcon,
  PaintBrush01Icon,
  Building01Icon,
  Cancel01Icon,
  CheckIcon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  InformationCircleIcon,
  CancelCircleIcon,
  Search01Icon,
  Calendar01Icon,
  PlusSignIcon,
  MinusSignIcon,
  MoreHorizontalIcon,
  ChevronsRightIcon,
  ChevronsLeftIcon,
  Edit01Icon,
  Delete01Icon,
  ClipboardCopyIcon,
} from '@hugeicons/core-free-icons';

const MAPPING: Record<string, typeof Home01Icon> = {
  'house.fill': Home01Icon,
  'paperplane.fill': Airplane01Icon,
  'chevron.left.forwardslash.chevron.right': CodeIcon,
  'chevron.right': ChevronRightIcon,
  'chevron.left': ChevronLeftIcon,
  'chevron.up': ChevronUpIcon,
  'chevron.down': ChevronDownIcon,
  'chevron.up.chevron.down': UnfoldMoreIcon,
  'paintbrush.fill': PaintBrush01Icon,
  'building.columns.fill': Building01Icon,
  'xmark': Cancel01Icon,
  'checkmark': CheckIcon,
  'checkmark.circle.fill': CheckmarkCircle01Icon,
  'exclamationmark.triangle.fill': Alert01Icon,
  'info.circle.fill': InformationCircleIcon,
  'xmark.circle.fill': CancelCircleIcon,
  'magnifyingglass': Search01Icon,
  'calendar': Calendar01Icon,
  'plus': PlusSignIcon,
  'minus': MinusSignIcon,
  'ellipsis': MoreHorizontalIcon,
  'chevron.right.2': ChevronsRightIcon,
  'chevron.left.2': ChevronsLeftIcon,
  'edit': Edit01Icon,
  'delete': Delete01Icon,
  'copy': ClipboardCopyIcon,
  'share': Airplane01Icon,
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  className,
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  const icon = MAPPING[name];
  if (!icon) return null;

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      style={style}
      className={className}
    />
  );
}
