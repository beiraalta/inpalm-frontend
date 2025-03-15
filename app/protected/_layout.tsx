import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const isAuthorized = true;

  if (!isAuthorized) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checklists" options={{ title: "Checklists" }} />
      <Stack.Screen name="pendings" options={{ title: "Pendências" }} />
      <Stack.Screen name="groups" options={{ title: "Grupos" }} />
      <Stack.Screen name="users" options={{ headerShown: false }} />
    </Stack>
  );
}