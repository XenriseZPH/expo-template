import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    try {
      await signIn("password", { email, password, flow });
      router.replace("/(tabs)");
    } catch (e: any) {
      setError(e?.data?.message ?? e?.message ?? "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center bg-white px-8 dark:bg-black"
    >
      <View className="mb-8">
        <Text className="text-3xl font-bold">
          {flow === "signIn" ? "Welcome back" : "Create account"}
        </Text>
        <Text className="mt-2 text-gray-500">
          {flow === "signIn"
            ? "Sign in to your account"
            : "Sign up for a new account"}
        </Text>
      </View>

      {error !== "" && (
        <View className="mb-4 rounded-lg bg-red-100 p-3">
          <Text className="text-red-600">{error}</Text>
        </View>
      )}

      <View className="gap-4">
        <TextInput
          className="rounded-xl border border-gray-300 p-4 text-base"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="rounded-xl border border-gray-300 p-4 text-base"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          className={`items-center rounded-xl p-4 ${submitting ? "bg-blue-300" : "bg-blue-500"}`}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text className="font-semibold text-white">
            {submitting
              ? "Please wait..."
              : flow === "signIn"
                ? "Sign In"
                : "Sign Up"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-6 items-center"
        onPress={() => {
          setFlow(flow === "signIn" ? "signUp" : "signIn");
          setError("");
        }}
      >
        <Text className="text-blue-500">
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
