import { defaultLanguage } from "@/shared/constants/languages";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: defaultLanguage.INFO.HOME }} />
      <Stack.Screen name="form" options={{ title: defaultLanguage.INFO.USERS }} />
    </Stack>
  );
}
