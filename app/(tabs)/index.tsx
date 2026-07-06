import { useQuery, useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Brand, Colors, LexendFonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Doc<"tasks">;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
}) {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  return (
    <View
      className="mx-6 mb-3 flex-row items-center gap-3 rounded-[10px] p-4"
      style={{
        backgroundColor: isDark ? "#151b2e" : "#fff",
        borderWidth: 1,
        borderColor: isDark ? "#232d47" : "#e2e8f0",
      }}
    >
      <Pressable
        onPress={() => onToggle(!task.completed)}
        className="h-6 w-6 items-center justify-center rounded-full border-2"
        style={{
          borderColor: task.completed ? Brand.green : Colors[colorScheme].icon + "80",
          backgroundColor: task.completed ? Brand.green : "transparent",
        }}
      >
        {task.completed && <IconSymbol size={14} name="checkmark" color="#fff" />}
      </Pressable>
      <ThemedText
        className="flex-1 text-base"
        style={
          task.completed
            ? { textDecorationLine: "line-through", opacity: 0.45 }
            : undefined
        }
      >
        {task.text}
      </ThemedText>
      <Pressable onPress={onDelete} className="p-2">
        <IconSymbol size={18} name="xmark" color={Brand.red} />
      </Pressable>
    </View>
  );
}

export default function TasksScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const deleteTask = useMutation(api.tasks.remove);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAdd = async () => {
    const text = newTaskText.trim();
    if (!text) return;
    await createTask({ text });
    setNewTaskText("");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors[colorScheme].background }}>
      <View className="flex-row items-center justify-between px-6 pt-16 pb-6">
        <ThemedText type="title">Tasks</ThemedText>
        <Pressable
          onPress={() => router.push("/design-system")}
          className="flex-row items-center gap-1.5 rounded-full px-3 py-2 active:opacity-80"
          style={{ backgroundColor: isDark ? "#1a2236" : Brand.secondary }}
        >
          <IconSymbol size={18} name="paintbrush.fill" color={Brand.primary} />
          <ThemedText className="text-sm" style={{ color: isDark ? "#fff" : Brand.primary, fontFamily: LexendFonts.semibold }}>
            Design
          </ThemedText>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-3 px-6">
        <TextInput
          className="h-14 flex-1 rounded-[10px] border px-4 text-base"
          placeholder="Add a task..."
          placeholderTextColor={Colors[colorScheme].icon + "99"}
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={handleAdd}
          style={{
            color: Colors[colorScheme].text,
            borderColor: Colors[colorScheme].icon + "40",
            backgroundColor: isDark ? "#0f1424" : "#f8faff",
            fontFamily: LexendFonts.regular,
          }}
        />
        <Pressable
          onPress={handleAdd}
          className="h-14 items-center justify-center rounded-[10px] bg-brand px-5 active:opacity-80"
        >
          <ThemedText style={{ color: "#fff", fontFamily: LexendFonts.semibold }}>Add</ThemedText>
        </Pressable>
      </View>

      {tasks === undefined ? (
        <View className="flex-1 items-center justify-center">
          <ThemedText className="opacity-50">Loading...</ThemedText>
        </View>
      ) : tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <ThemedText className="text-center opacity-50">
            No tasks yet. Add one above!
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={(completed) =>
                toggleTask({ taskId: item._id, completed })
              }
              onDelete={() => deleteTask({ taskId: item._id })}
            />
          )}
          className="flex-1"
        />
      )}
    </View>
  );
}
