import "react-native-reanimated";
import { ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
      <ScrollView style={styles.container}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="checklists" options={{ title: "Checklists" }} />
          <Stack.Screen name="pendings" options={{ title: "Pendências" }} />
          <Stack.Screen name="groups" options={{ title: "Grupos" }} />
          <Stack.Screen name="users" options={{ title: "Usuários" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
});
