import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React from "react";

export { isLoadingAtom } from "./atom";

export function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: Dimensions.get("window").height,
    justifyContent: "center",
    padding: 20,
  },
});
