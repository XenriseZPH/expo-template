import { useQuery, useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Doc<"tasks">;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Pressable
        onPress={() => onToggle(!task.completed)}
        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
          task.completed
            ? "border-green-500 bg-green-500"
            : "border-gray-300"
        }`}
      >
        {task.completed && <Text className="text-xs text-white">✓</Text>}
      </Pressable>
      <Text
        className={`flex-1 text-base ${
          task.completed ? "text-gray-400 line-through" : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {task.text}
      </Text>
      <Pressable onPress={onDelete} className="p-2">
        <Text className="text-red-500">✕</Text>
      </Pressable>
    </View>
  );
}

export default function TasksScreen() {
  const router = useRouter();
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
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-row items-center justify-between px-4 pt-16 pb-2">
        <Text className="text-3xl font-bold text-navy dark:text-white">Tasks</Text>
        <Pressable
          onPress={() => router.push("/design-system")}
          className="flex-row items-center gap-1.5 rounded-full bg-brand-tint px-3 py-2 active:opacity-80 dark:bg-[#1a2236]"
        >
          <IconSymbol size={18} name="paintbrush.fill" color="#0040e7" />
          <Text className="text-sm font-semibold text-brand">Design</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-2 px-4 py-2">
        <TextInput
          className="flex-1 rounded-xl border border-gray-300 p-3 text-base"
          placeholder="Add a task..."
          placeholderTextColor="#9CA3AF"
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={handleAdd}
        />
        <Pressable
          onPress={handleAdd}
          className="rounded-xl bg-brand px-5 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">Add</Text>
        </Pressable>
      </View>

      {tasks === undefined ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Loading...</Text>
        </View>
      ) : tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">No tasks yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
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
