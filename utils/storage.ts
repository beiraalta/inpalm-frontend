import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
  static async getItem(key: string) {
    if (Platform.OS === "web") {
      return (await AsyncStorage.getItem(key)) ?? undefined;
    }
    return (await SecureStore.getItemAsync(key)) ?? undefined;
  }

  static async removeItem(key: string) {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  }

  static async setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  }
}
