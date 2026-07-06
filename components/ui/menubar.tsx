import * as React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { LexendFonts, useUIColors } from '@/components/ui/theme';

type MenubarMenuItem = {
  label: string;
  icon?: string;
  destructive?: boolean;
  onPress: () => void;
};

type MenubarMenu = {
  label: string;
  items: MenubarMenuItem[];
};

type MenubarProps = {
  menus: MenubarMenu[];
};

export function Menubar({ menus }: MenubarProps) {
  const c = useUIColors();

  return (
    <View
      className="flex-row rounded-[10px] p-1"
      style={{ borderWidth: 1, borderColor: c.border, backgroundColor: c.surface }}>
      {menus.map((menu, index) => (
        <DropdownMenu
          key={`${menu.label}-${index}`}
          items={menu.items}
          trigger={
            <Pressable className="h-9 items-center justify-center rounded-[8px] px-3 active:opacity-80">
              <ThemedText style={{ fontFamily: LexendFonts.medium }}>{menu.label}</ThemedText>
            </Pressable>
          }
        />
      ))}
    </View>
  );
}
