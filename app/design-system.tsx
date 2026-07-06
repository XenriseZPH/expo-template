import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Brand, Colors, LexendFonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Accordion } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar } from '@/components/ui/avatar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button, ButtonGroup } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible } from '@/components/ui/collapsible';
import { Combobox } from '@/components/ui/combobox';
import { ContextMenu } from '@/components/ui/context-menu';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Field, Input } from '@/components/ui/field';
import { HoverCard } from '@/components/ui/hover-card';
import { InputGroup } from '@/components/ui/input-group';
import { InputOTP } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Menubar } from '@/components/ui/menubar';
import { Pagination } from '@/components/ui/pagination';
import { Popover } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select } from '@/components/ui/select';
import { Separator as UiSeparator } from '@/components/ui/separator';
import { Sheet } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch as UiSwitch } from '@/components/ui/switch';
import { Tabs } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/toast';

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
    default: { bg: Brand.primary, color: '#fff', pressed: Brand.primaryDark, border: false },
    secondary: {
      bg: isDark ? '#1a2236' : Brand.secondary,
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#232d47' : Brand.primaryLight,
      border: false,
    },
    accent: { bg: Brand.accent, color: Brand.navy, pressed: Brand.accentDark, border: false },
    outline: {
      bg: 'transparent',
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#1a2236' : Brand.secondary,
      border: true,
    },
    ghost: {
      bg: 'transparent',
      color: isDark ? '#fff' : Brand.primary,
      pressed: isDark ? '#1a2236' : Brand.secondary,
      border: false,
    },
    destructive: { bg: Brand.red, color: '#fff', pressed: '#a50e1f', border: false },
  };

  const v = variants[variant];
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className="rounded-[10px] px-4 py-2.5"
      style={[
        v.border ? { borderWidth: 1.5, borderColor: Brand.primary } : null,
        { backgroundColor: pressed ? v.pressed : v.bg },
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
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(true);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('email');
  const [uiSwitch, setUiSwitch] = useState(true);
  const [tab, setTab] = useState('overview');
  const [bold, setBold] = useState(false);
  const [align, setAlign] = useState('left');
  const { toast } = useToast();
  const [otp, setOtp] = useState('');
  const [search, setSearch] = useState('');
  const [bio, setBio] = useState('');
  const [fruit, setFruit] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [slider, setSlider] = useState(40);
  const [page, setPage] = useState(3);
  const [date, setDate] = useState<Date | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fruitOptions = [
    { label: 'Mango', value: 'mango' },
    { label: 'Banana', value: 'banana' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Calamansi', value: 'calamansi' },
  ];
  const cityOptions = [
    { label: 'Manila', value: 'manila' },
    { label: 'Cebu', value: 'cebu' },
    { label: 'Davao', value: 'davao' },
    { label: 'Baguio', value: 'baguio' },
    { label: 'Iloilo', value: 'iloilo' },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: Colors[colorScheme].background }}>
      {/* Custom header (matches the Profile tab spacing) */}
      <View
        className="flex-row items-center gap-2 px-6 pb-6"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="-ml-2 h-9 w-9 items-center justify-center rounded-full active:opacity-80"
        >
          <IconSymbol name="chevron.left" size={24} color={Brand.primary} />
        </Pressable>
        <ThemedText type="title">Design System</ThemedText>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: Colors[colorScheme].background }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48 }}
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

      <Separator />

      {/* Avatar */}
      <SectionTitle>Avatar</SectionTitle>
      <Card className="flex-row items-center gap-3">
        <Avatar source={{ uri: 'https://i.pravatar.cc/100?img=12' }} />
        <Avatar fallback="JD" />
        <Avatar fallback="eGov" size={56} />
      </Card>

      <Separator />

      {/* Checkbox & Radio */}
      <SectionTitle>Checkbox & Radio</SectionTitle>
      <Card className="gap-4">
        <Pressable className="flex-row items-center gap-3" onPress={() => setChecked(!checked)}>
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Label>I agree to the terms</Label>
        </Pressable>
        <RadioGroup value={radio} onValueChange={setRadio}>
          <ThemedView className="gap-2">
            <RadioGroupItem value="email" label="Email" />
            <RadioGroupItem value="sms" label="SMS" />
            <RadioGroupItem value="push" label="Push notification" />
          </ThemedView>
        </RadioGroup>
      </Card>

      <Separator />

      {/* Switch (component) */}
      <SectionTitle>Switch</SectionTitle>
      <Card className="flex-row items-center justify-between">
        <Label>Biometric login</Label>
        <UiSwitch value={uiSwitch} onValueChange={setUiSwitch} />
      </Card>

      <Separator />

      {/* Separator */}
      <SectionTitle>Separator</SectionTitle>
      <Card>
        <ThemedText>Above</ThemedText>
        <UiSeparator className="my-3" />
        <ThemedText>Below</ThemedText>
        <ThemedView className="mt-3 h-8 flex-row items-center gap-3">
          <ThemedText>A</ThemedText>
          <UiSeparator orientation="vertical" />
          <ThemedText>B</ThemedText>
          <UiSeparator orientation="vertical" />
          <ThemedText>C</ThemedText>
        </ThemedView>
      </Card>

      <Separator />

      {/* Tabs */}
      <SectionTitle>Tabs</SectionTitle>
      <Tabs
        value={tab}
        onValueChange={setTab}
        items={[
          {
            value: 'overview',
            label: 'Overview',
            content: <Card><ThemedText className="text-sm opacity-70">Overview content.</ThemedText></Card>,
          },
          {
            value: 'activity',
            label: 'Activity',
            content: <Card><ThemedText className="text-sm opacity-70">Recent activity.</ThemedText></Card>,
          },
          {
            value: 'settings',
            label: 'Settings',
            content: <Card><ThemedText className="text-sm opacity-70">Your settings.</ThemedText></Card>,
          },
        ]}
      />

      <Separator />

      {/* Toggle & Toggle Group */}
      <SectionTitle>Toggle & Toggle Group</SectionTitle>
      <Card className="gap-3">
        <ThemedView className="flex-row gap-2">
          <Toggle pressed={bold} onPressedChange={setBold} variant="outline">Bold</Toggle>
          <Toggle pressed={!bold} onPressedChange={(v) => setBold(!v)} variant="outline">Normal</Toggle>
        </ThemedView>
        <ToggleGroup
          type="single"
          value={align}
          onValueChange={setAlign}
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
        />
      </Card>

      <Separator />

      {/* Tooltip & Hover Card */}
      <SectionTitle>Tooltip & Hover Card</SectionTitle>
      <Card className="flex-row gap-3">
        <Tooltip content="Tap to view your verified digital ID.">
          <Button variant="outline">Tooltip</Button>
        </Tooltip>
        <HoverCard trigger={<Button variant="secondary">Hover Card</Button>}>
          <ThemedText type="defaultSemiBold">eGovPH</ThemedText>
          <ThemedText className="mt-1 text-sm opacity-70">
            Over 1,000 government services in one app.
          </ThemedText>
        </HoverCard>
      </Card>

      <Separator />

      {/* Context Menu & Menubar */}
      <SectionTitle>Context Menu & Menubar</SectionTitle>
      <Card className="gap-3">
        <ContextMenu
          trigger={
            <ThemedView
              className="items-center rounded-[10px] border border-dashed p-4"
              style={{ borderColor: Colors[colorScheme].icon + '66' }}
            >
              <ThemedText className="text-sm opacity-70">Long-press me</ThemedText>
            </ThemedView>
          }
          items={[
            { label: 'Copy', icon: 'checkmark', onPress: () => {} },
            { label: 'Delete', icon: 'xmark', destructive: true, onPress: () => {} },
          ]}
        />
        <Menubar
          menus={[
            {
              label: 'File',
              items: [
                { label: 'New', onPress: () => {} },
                { label: 'Open', onPress: () => {} },
              ],
            },
            {
              label: 'Edit',
              items: [
                { label: 'Undo', onPress: () => {} },
                { label: 'Redo', onPress: () => {} },
              ],
            },
          ]}
        />
      </Card>

      <Separator />

      {/* Aspect Ratio */}
      <SectionTitle>Aspect Ratio</SectionTitle>
      <Card>
        <AspectRatio ratio={16 / 9}>
          <ThemedView
            className="h-full w-full items-center justify-center rounded-[10px]"
            style={{ backgroundColor: Brand.secondary }}
          >
            <ThemedText style={{ color: Brand.primary, fontFamily: LexendFonts.semibold }}>16 : 9</ThemedText>
          </ThemedView>
        </AspectRatio>
      </Card>

      <Separator />

      {/* Button & Button Group */}
      <SectionTitle>Button & Button Group</SectionTitle>
      <Card className="gap-3">
        <View className="flex-row flex-wrap gap-2">
          <Button size="sm" icon="checkmark">Small</Button>
          <Button icon="plus">Medium</Button>
          <Button size="lg">Large</Button>
        </View>
        <Button loading>Loading</Button>
        <ButtonGroup>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Confirm</Button>
        </ButtonGroup>
        <ButtonGroup attached>
          <Button variant="secondary" className="flex-1">Day</Button>
          <Button variant="secondary" className="flex-1">Week</Button>
          <Button variant="secondary" className="flex-1">Month</Button>
        </ButtonGroup>
      </Card>

      <Separator />

      {/* Alert */}
      <SectionTitle>Alert</SectionTitle>
      <View className="gap-2.5">
        <Alert variant="info" title="Heads up" description="Your ID renewal is due in 30 days." />
        <Alert variant="success" title="Verified" description="Your account has been verified." />
        <Alert variant="warning" title="Action needed" description="Please complete your profile." />
        <Alert variant="destructive" title="Payment failed" description="We couldn't process your payment." />
      </View>

      <Separator />

      {/* Breadcrumb */}
      <SectionTitle>Breadcrumb</SectionTitle>
      <Card>
        <Breadcrumb
          items={[
            { label: 'Home', onPress: () => {} },
            { label: 'Services', onPress: () => {} },
            { label: 'National ID' },
          ]}
        />
      </Card>

      <Separator />

      {/* Accordion */}
      <SectionTitle>Accordion</SectionTitle>
      <Accordion
        items={[
          {
            title: 'What is eGovPH?',
            content: <ThemedText className="text-sm leading-5 opacity-70">A super app for government services.</ThemedText>,
          },
          {
            title: 'How do I register?',
            content: <ThemedText className="text-sm leading-5 opacity-70">Download the app and sign up with your details.</ThemedText>,
          },
          {
            title: 'Is it free?',
            content: <ThemedText className="text-sm leading-5 opacity-70">Yes, the app is free to use.</ThemedText>,
          },
        ]}
      />

      <Separator />

      {/* Collapsible */}
      <SectionTitle>Collapsible</SectionTitle>
      <Card>
        <Collapsible title="Show requirements">
          <ThemedText className="text-sm leading-5 opacity-70">
            Valid ID, proof of address, and a recent photo.
          </ThemedText>
        </Collapsible>
      </Card>

      <Separator />

      {/* Form Fields */}
      <SectionTitle>Form Fields</SectionTitle>
      <Card className="gap-4">
        <Field label="Full name" required hint="As printed on your ID">
          <Input placeholder="Juan dela Cruz" />
        </Field>
        <Field label="Search">
          <InputGroup
            leftIcon="magnifyingglass"
            placeholder="Search services..."
            value={search}
            onChangeText={setSearch}
          />
        </Field>
        <Field label="Bio" error="This field is required">
          <Textarea placeholder="Tell us about yourself" value={bio} onChangeText={setBio} error />
        </Field>
      </Card>

      <Separator />

      {/* Input OTP */}
      <SectionTitle>Input OTP</SectionTitle>
      <Card className="items-center gap-2">
        <InputOTP value={otp} onChange={setOtp} />
        <ThemedText className="text-xs opacity-60">Enter the 6-digit code</ThemedText>
      </Card>

      <Separator />

      {/* Select & Combobox */}
      <SectionTitle>Select & Combobox</SectionTitle>
      <Card className="gap-3">
        <Field label="Favorite fruit">
          <Select value={fruit} onValueChange={setFruit} options={fruitOptions} placeholder="Choose one" />
        </Field>
        <Field label="City">
          <Combobox value={city} onValueChange={setCity} options={cityOptions} placeholder="Search a city" />
        </Field>
      </Card>

      <Separator />

      {/* Slider */}
      <SectionTitle>Slider</SectionTitle>
      <Card className="gap-2">
        <View className="flex-row justify-between">
          <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>Volume</ThemedText>
          <ThemedText className="text-sm" style={{ color: Brand.primary, fontFamily: LexendFonts.semibold }}>
            {Math.round(slider)}
          </ThemedText>
        </View>
        <Slider value={slider} onValueChange={setSlider} />
      </Card>

      <Separator />

      {/* Pagination */}
      <SectionTitle>Pagination</SectionTitle>
      <Card className="items-center">
        <Pagination page={page} pageCount={10} onPageChange={setPage} />
      </Card>

      <Separator />

      {/* Date Picker & Calendar */}
      <SectionTitle>Date Picker & Calendar</SectionTitle>
      <Card className="gap-4">
        <Field label="Appointment date">
          <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
        </Field>
        <Calendar value={date} onChange={setDate} />
      </Card>

      <Separator />

      {/* Dropdown & Popover */}
      <SectionTitle>Dropdown & Popover</SectionTitle>
      <Card className="flex-row gap-3">
        <DropdownMenu
          trigger={<Button variant="outline" icon="ellipsis">Menu</Button>}
          items={[
            { label: 'Edit', icon: 'paintbrush.fill', onPress: () => toast({ title: 'Edit' }) },
            { label: 'Share', icon: 'paperplane.fill', onPress: () => toast({ title: 'Shared' }) },
            { label: 'Delete', icon: 'xmark', destructive: true, onPress: () => toast({ title: 'Deleted', variant: 'destructive' }) },
          ]}
        />
        <Popover trigger={<Button variant="secondary">Popover</Button>}>
          <ThemedText className="text-sm leading-5" style={{ maxWidth: 200 }}>
            Popovers float above content and dismiss on outside tap.
          </ThemedText>
        </Popover>
      </Card>

      <Separator />

      {/* Overlays */}
      <SectionTitle>Overlays</SectionTitle>
      <Card className="gap-2.5">
        <Button variant="outline" onPress={() => setDialogOpen(true)}>Open Dialog</Button>
        <Button variant="outline" onPress={() => setAlertOpen(true)}>Open Alert Dialog</Button>
        <Button variant="outline" onPress={() => setSheetOpen(true)}>Open Sheet</Button>
        <Button variant="outline" onPress={() => setDrawerOpen(true)}>Open Drawer</Button>
      </Card>

      <Separator />

      {/* Toast */}
      <SectionTitle>Toast</SectionTitle>
      <Card className="gap-2">
        <View className="flex-row gap-2">
          <Button className="flex-1" size="sm" onPress={() => toast({ title: 'Saved', description: 'Your changes were saved.', variant: 'success' })}>Success</Button>
          <Button className="flex-1" size="sm" variant="destructive" onPress={() => toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' })}>Error</Button>
        </View>
        <View className="flex-row gap-2">
          <Button className="flex-1" size="sm" variant="secondary" onPress={() => toast({ title: 'Note', description: 'Just so you know.', variant: 'info' })}>Info</Button>
          <Button className="flex-1" size="sm" variant="accent" onPress={() => toast({ title: 'Careful', variant: 'warning' })}>Warning</Button>
        </View>
      </Card>

      {/* Overlay instances */}
      <Dialog
        visible={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Update profile"
        description="Make changes to your profile here."
        footer={
          <>
            <Button variant="outline" onPress={() => setDialogOpen(false)}>Cancel</Button>
            <Button onPress={() => setDialogOpen(false)}>Save</Button>
          </>
        }
      >
        <Field label="Display name">
          <Input placeholder="Juan" />
        </Field>
      </Dialog>

      <AlertDialog
        visible={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Delete account?"
        description="This action cannot be undone."
        confirmText="Delete"
        destructive
        onConfirm={() => toast({ title: 'Account deleted', variant: 'destructive' })}
      />

      <Sheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Quick actions">
        <View className="gap-2.5">
          <Button variant="ghost" onPress={() => setSheetOpen(false)}>Share</Button>
          <Button variant="ghost" onPress={() => setSheetOpen(false)}>Duplicate</Button>
          <Button variant="ghost" onPress={() => setSheetOpen(false)}>Archive</Button>
        </View>
      </Sheet>

      <Drawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
        <View className="gap-2.5">
          <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Dashboard</Button>
          <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Services</Button>
          <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Settings</Button>
        </View>
      </Drawer>
      </ScrollView>
    </View>
  );
}
