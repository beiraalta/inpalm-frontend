import { defaultLanguage } from "@/shared/constants/languages";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="form" options={{ title: defaultLanguage.INFO.PURCHASE_PENDINGS }} />
    </Stack>
  );
}
