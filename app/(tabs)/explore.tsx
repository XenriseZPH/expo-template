import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { api } from "@/convex/_generated/api";
import { Brand, Colors, LexendFonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function StatCard({ label, value }: { label: string; value: number }) {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  return (
    <View
      className="flex-1 gap-1 rounded-[10px] p-4"
      style={{
        backgroundColor: isDark ? "#151b2e" : "#fff",
        borderWidth: 1,
        borderColor: isDark ? "#232d47" : "#e2e8f0",
      }}
    >
      <ThemedText className="text-3xl" style={{ color: Brand.primary, fontFamily: LexendFonts.bold }}>
        {value}
      </ThemedText>
      <ThemedText className="text-xs opacity-60">{label}</ThemedText>
    </View>
  );
}

export default function ProfileScreen() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const tasks = useQuery(api.tasks.list);
  const completedCount = tasks?.filter((t) => t.completed).length ?? 0;
  const totalCount = tasks?.length ?? 0;
  const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View className="flex-1 px-6" style={{ backgroundColor: Colors[colorScheme].background }}>
      <View className="pt-16 pb-6">
        <ThemedText type="title">Profile</ThemedText>
      </View>

      {/* Stat tiles */}
      <View className="flex-row gap-3">
        <StatCard label="Total tasks" value={totalCount} />
        <StatCard label="Completed" value={completedCount} />
      </View>

      {/* Progress card */}
      <View
        className="mt-4 gap-3 rounded-[10px] p-4"
        style={{
          backgroundColor: isDark ? "#151b2e" : "#fff",
          borderWidth: 1,
          borderColor: isDark ? "#232d47" : "#e2e8f0",
        }}
      >
        <View className="flex-row items-center justify-between">
          <ThemedText className="text-sm" style={{ fontFamily: LexendFonts.medium }}>
            Completion
          </ThemedText>
          <ThemedText className="text-sm" style={{ color: Brand.primary, fontFamily: LexendFonts.semibold }}>
            {pct}%
          </ThemedText>
        </View>
        <View
          className="h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: Colors[colorScheme].icon + "22" }}
        >
          <View className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </View>
      </View>

      {/* Design system link */}
      <Pressable
        onPress={() => router.push("/design-system")}
        className="mt-4 flex-row items-center justify-between rounded-[10px] p-4 active:opacity-80"
        style={{ backgroundColor: isDark ? "#1a2236" : Brand.secondary }}
      >
        <View className="flex-row items-center gap-3">
          <IconSymbol size={22} name="paintbrush.fill" color={Brand.primary} />
          <ThemedText style={{ color: isDark ? "#fff" : Brand.primary, fontFamily: LexendFonts.semibold }}>
            Design System
          </ThemedText>
        </View>
        <IconSymbol size={20} name="chevron.right" color={Brand.primary} />
      </Pressable>

      <Pressable
        onPress={handleSignOut}
        className="mt-8 items-center rounded-[10px] bg-ph-red p-4 active:opacity-80"
      >
        <ThemedText style={{ color: "#fff", fontFamily: LexendFonts.semibold }}>Sign Out</ThemedText>
      </Pressable>
    </View>
  );
}
