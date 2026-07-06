import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { Pressable, Text, View } from "react-native";
import { api } from "@/convex/_generated/api";

export default function ProfileScreen() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const tasks = useQuery(api.tasks.list);
  const completedCount = tasks?.filter((t) => t.completed).length ?? 0;
  const totalCount = tasks?.length ?? 0;

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View className="flex-1 bg-white px-6 dark:bg-black">
      <View className="pt-16 pb-8">
        <Text className="text-3xl font-bold">Profile</Text>
      </View>

      <View className="gap-4 rounded-2xl bg-gray-50 p-6 dark:bg-gray-900">
        <Text className="text-lg font-semibold">Stats</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Total tasks</Text>
          <Text className="font-semibold">{totalCount}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Completed</Text>
          <Text className="font-semibold">{completedCount}</Text>
        </View>
      </View>

      <Pressable
        onPress={handleSignOut}
        className="mt-8 items-center rounded-xl bg-red-500 p-4"
      >
        <Text className="font-semibold text-white">Sign Out</Text>
      </Pressable>
    </View>
  );
}
