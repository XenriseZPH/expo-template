import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Brand, Colors, LexendFonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SignInScreen() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputStyle = {
    color: Colors[colorScheme].text,
    borderColor: Colors[colorScheme].icon + "40",
    backgroundColor: isDark ? "#0f1424" : "#f8faff",
    fontFamily: LexendFonts.regular,
  };

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
      className="flex-1 justify-center px-8"
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      <View className="mb-8">
        {/* Brand mark */}
        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-[12px] bg-brand">
            <IconSymbol size={26} name="building.columns.fill" color="#ffffff" />
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="h-2.5 w-2.5 rounded-full bg-accent" />
            <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: isDark ? "#fff" : Brand.navy }} />
            <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: Brand.red }} />
          </View>
        </View>

        <ThemedText type="title">
          {flow === "signIn" ? "Welcome back" : "Create account"}
        </ThemedText>
        <ThemedText className="mt-2 opacity-60">
          {flow === "signIn"
            ? "Sign in to your account"
            : "Sign up for a new account"}
        </ThemedText>
      </View>

      {error !== "" && (
        <View className="mb-4 rounded-[10px] p-3" style={{ backgroundColor: Brand.red + "1A" }}>
          <ThemedText className="text-sm" style={{ color: Brand.red }}>{error}</ThemedText>
        </View>
      )}

      <View className="gap-4">
        <TextInput
          className="rounded-[10px] border p-4 text-base"
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme].icon + "99"}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={inputStyle}
        />
        <TextInput
          className="rounded-[10px] border p-4 text-base"
          placeholder="Password"
          placeholderTextColor={Colors[colorScheme].icon + "99"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={inputStyle}
        />
        <Pressable
          className="items-center rounded-[10px] bg-brand p-4 active:opacity-80"
          style={{ opacity: submitting ? 0.6 : 1 }}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <ThemedText className="text-white" style={{ color: "#fff", fontFamily: LexendFonts.semibold }}>
            {submitting
              ? "Please wait..."
              : flow === "signIn"
                ? "Sign In"
                : "Sign Up"}
          </ThemedText>
        </Pressable>
      </View>

      <Pressable
        className="mt-6 items-center"
        onPress={() => {
          setFlow(flow === "signIn" ? "signUp" : "signIn");
          setError("");
        }}
      >
        <ThemedText type="link">
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </ThemedText>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
