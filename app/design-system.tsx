import { useState } from 'react';
import { Pressable, ScrollView, Switch, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Brand, Colors, LexendFonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function SectionTitle({ children }: { children: string }) {
  return (
    <ThemedText type="subtitle" className="mb-1 mt-2">
      {children}
    </ThemedText>
  );
}

function Separator() {
  const colorScheme = useColorScheme() ?? 'light';
  return <View className="my-4 h-px" style={{ backgroundColor: Colors[colorScheme].icon + '33' }} />;
}

function Badge({
  children,
  variant = 'default',
}: {
  children: string;
  variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline';
}) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const variants = {
    default: { bg: 'bg-brand', color: '#fff' },
    secondary: {
      bg: isDark ? 'bg-[#1a2236]' : 'bg-brand-tint',
      color: isDark ? '#fff' : Brand.primary,
    },
    accent: { bg: 'bg-accent', color: Brand.navy },
    destructive: { bg: 'bg-ph-red', color: '#fff' },
    outline: { bg: 'bg-transparent', color: isDark ? '#fff' : Brand.navy },
  };

  const v = variants[variant];

  return (
    <View
      className={`rounded-full px-3 py-1 ${v.bg}`}
      style={variant === 'outline' ? { borderWidth: 1, borderColor: Brand.primary + '66' } : undefined}
    >
      <ThemedText className="text-xs" style={{ color: v.color, fontFamily: LexendFonts.semibold }}>
        {children}
      </ThemedText>
    </View>
  );
}

function DesignButton({
  children,
  variant = 'default',
}: {
  children: string;
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';
}) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const variants = {
    default: { bg: 'bg-brand', color: '#fff', pressed: Brand.primaryDark },
    secondary: {
      bg: isDark ? 'bg-[#1a2236]' : 'bg-brand-tint',
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#232d47' : Brand.primaryLight,
    },
    accent: { bg: 'bg-accent', color: Brand.navy, pressed: Brand.accentDark },
    outline: {
      bg: 'bg-transparent',
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#1a2236' : Brand.secondary,
    },
    ghost: {
      bg: 'bg-transparent',
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#1a2236' : Brand.secondary,
    },
    destructive: { bg: 'bg-ph-red', color: '#fff', pressed: '#a50e1f' },
  };

  const v = variants[variant];

  return (
    <Pressable
      className={`rounded-[10px] px-4 py-2.5 ${v.bg}`}
      style={({ pressed }) => [
        variant === 'outline' ? { borderWidth: 1.5, borderColor: Brand.primary } : undefined,
        { backgroundColor: pressed ? v.pressed : undefined },
      ]}
    >
      <ThemedText className="text-center text-sm" style={{ color: v.color, fontFamily: LexendFonts.semibold }}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  return (
    <ThemedView
      className={`rounded-[10px] p-4 ${className ?? ''}`}
      style={{
        backgroundColor: isDark ? '#151b2e' : '#fff',
        borderWidth: 1,
        borderColor: isDark ? '#232d47' : '#e2e8f0',
        shadowColor: Brand.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0 : 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {children}
    </ThemedView>
  );
}

function Skeleton({ className }: { className?: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View
      className={`rounded-md ${className ?? ''}`}
      style={{ backgroundColor: Colors[colorScheme].icon + '22' }}
    />
  );
}

function ColorSwatch({ color, label, ring }: { color: string; label: string; ring?: boolean }) {
  return (
    <ThemedView className="flex-1 items-center gap-1.5">
      <View
        className="h-11 w-11 rounded-[10px]"
        style={{ backgroundColor: color, borderWidth: ring ? 1 : 0, borderColor: '#e2e8f0' }}
      />
      <ThemedText className="text-[11px] opacity-70">{label}</ThemedText>
    </ThemedView>
  );
}

function Progress({ value }: { value: number }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View
      className="h-2 overflow-hidden rounded-full"
      style={{ backgroundColor: Colors[colorScheme].icon + '22' }}
    >
      <View className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
    </View>
  );
}

export default function DesignSystemScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const [isEnabled, setIsEnabled] = useState(true);
  const [text, setText] = useState('');

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: Colors[colorScheme].background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
    >
      {/* Branded hero */}
      <View
        className="mb-5 overflow-hidden rounded-[16px] p-5"
        style={{ backgroundColor: isDark ? '#0a1230' : Brand.primary }}
      >
        <IconSymbol
          size={160}
          color="#ffffff"
          name="building.columns.fill"
          className="absolute bottom-[-30px] right-[-10px] opacity-15"
        />
        <View className="mb-3 flex-row items-center gap-2">
          <View className="h-3 w-3 rounded-full bg-accent" />
          <View className="h-3 w-3 rounded-full bg-white" />
          <View className="h-3 w-3 rounded-full" style={{ backgroundColor: Brand.red }} />
        </View>
        <ThemedText type="title" className="text-white" lightColor="#fff" darkColor="#fff">
          eGovPH Design System
        </ThemedText>
        <ThemedText className="mt-1 leading-5 text-white opacity-80" lightColor="#fff" darkColor="#fff">
          Royal blue with Philippine flag accents and the Lexend typeface — styled with NativeWind.
        </ThemedText>
      </View>

      {/* Colors */}
      <SectionTitle>Colors</SectionTitle>
      <Card>
        <ThemedView className="flex-row gap-2">
          <ColorSwatch color={Brand.primary} label="Primary" />
          <ColorSwatch color={Brand.accent} label="Yellow" />
          <ColorSwatch color={Brand.red} label="Red" />
          <ColorSwatch color={Brand.secondary} label="Tint" ring />
          <ColorSwatch color={Brand.navy} label="Navy" />
        </ThemedView>
      </Card>

      <Separator />

      {/* Typography */}
      <SectionTitle>Typography</SectionTitle>
      <Card className="gap-2">
        <ThemedText type="title">Lexend Bold</ThemedText>
        <ThemedText type="subtitle">Lexend Semibold</ThemedText>
        <ThemedText className="text-lg" style={{ fontFamily: LexendFonts.semibold }}>
          Heading — Semibold
        </ThemedText>
        <ThemedText className="text-base" style={{ fontFamily: LexendFonts.medium }}>
          Subheading — Medium
        </ThemedText>
        <ThemedText>Body text — the default Lexend Regular used throughout the app.</ThemedText>
        <ThemedText className="text-sm leading-5 opacity-70">
          Muted text used for descriptions and labels.
        </ThemedText>
        <ThemedText className="text-xs opacity-60">Small / caption text for fine print.</ThemedText>
        <ThemedText type="link">Link text</ThemedText>
      </Card>

      <Separator />

      {/* Buttons */}
      <SectionTitle>Buttons</SectionTitle>
      <Card className="gap-2.5">
        <DesignButton variant="default">Primary</DesignButton>
        <DesignButton variant="secondary">Secondary</DesignButton>
        <DesignButton variant="accent">Accent</DesignButton>
        <DesignButton variant="outline">Outline</DesignButton>
        <DesignButton variant="ghost">Ghost</DesignButton>
        <DesignButton variant="destructive">Destructive</DesignButton>
        <ThemedView className="flex-row gap-2">
          <DesignButton variant="default">Continue</DesignButton>
          <DesignButton variant="outline">Cancel</DesignButton>
        </ThemedView>
      </Card>

      <Separator />

      {/* Badges */}
      <SectionTitle>Badges</SectionTitle>
      <Card>
        <ThemedView className="flex-row flex-wrap gap-2">
          <Badge>Verified</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="accent">New</Badge>
          <Badge variant="destructive">Expired</Badge>
          <Badge variant="outline">Draft</Badge>
        </ThemedView>
      </Card>

      <Separator />

      {/* Card */}
      <SectionTitle>Cards</SectionTitle>
      <Card className="gap-3">
        <Skeleton className="h-32 w-full" />
        <ThemedView className="gap-1.5">
          <ThemedText type="subtitle">National ID</ThemedText>
          <ThemedText className="text-sm leading-5 opacity-70">
            A card component with a skeleton image placeholder, title, and descriptive text.
          </ThemedText>
        </ThemedView>
        <ThemedView className="flex-row gap-2">
          <DesignButton variant="default">View</DesignButton>
          <DesignButton variant="outline">Share</DesignButton>
        </ThemedView>
      </Card>

      <Separator />

      {/* Form elements */}
      <SectionTitle>Form Elements</SectionTitle>
      <Card className="gap-4">
        <ThemedView className="gap-1.5">
          <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>
            Email
          </ThemedText>
          <TextInput
            className="rounded-[10px] border px-3 py-2.5 text-base"
            placeholder="you@example.com"
            placeholderTextColor={Colors[colorScheme].icon + '99'}
            value={text}
            onChangeText={setText}
            style={{
              color: Colors[colorScheme].text,
              borderColor: text ? Brand.primary : Colors[colorScheme].icon + '40',
              backgroundColor: isDark ? '#0f1424' : '#f8faff',
              fontFamily: LexendFonts.regular,
            }}
          />
        </ThemedView>

        <ThemedView className="flex-row items-center justify-between">
          <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>
            Enable notifications
          </ThemedText>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            trackColor={{ false: Colors[colorScheme].icon + '40', true: Brand.primary }}
            thumbColor="#fff"
          />
        </ThemedView>
      </Card>

      <Separator />

      {/* Progress */}
      <SectionTitle>Progress</SectionTitle>
      <Card className="gap-2">
        <ThemedView className="flex-row justify-between">
          <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>
            Application status
          </ThemedText>
          <ThemedText className="text-sm" style={{ color: Brand.primary, fontFamily: LexendFonts.semibold }}>
            67%
          </ThemedText>
        </ThemedView>
        <Progress value={67} />
      </Card>

      <Separator />

      {/* Skeleton */}
      <SectionTitle>Skeleton</SectionTitle>
      <Card className="gap-3">
        <ThemedView className="flex-row items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <ThemedView className="flex-1 gap-1.5">
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-2.5 w-2/5" />
          </ThemedView>
        </ThemedView>
        <Skeleton className="h-24 w-full" />
        <ThemedView className="flex-row gap-2">
          <Skeleton className="h-9 flex-1 rounded-[10px]" />
          <Skeleton className="h-9 flex-1 rounded-[10px]" />
        </ThemedView>
      </Card>
    </ScrollView>
  );
}
