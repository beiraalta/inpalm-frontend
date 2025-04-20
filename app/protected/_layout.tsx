import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checklists" options={{ headerShown: false }} />
      <Stack.Screen name="pendings" options={{ title: "Pendências" }} />
      <Stack.Screen name="groups" options={{ title: "Grupos" }} />
      <Stack.Screen name="accounts" options={{ headerShown: false }} />
    </Stack>
  );
}
