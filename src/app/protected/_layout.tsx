import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checklists" options={{ headerShown: false }} />
      <Stack.Screen name="piece-pendings" options={{ headerShown: false }} />
      <Stack.Screen name="purchase-pendings" options={{ headerShown: false }} />
      <Stack.Screen name="accounts" options={{ headerShown: false }} />
    </Stack>
  );
}
