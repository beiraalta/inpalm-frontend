import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React from "react";

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: Dimensions.get("window").height,
    justifyContent: "center",
    padding: 20,
  },
});

export default Spinner;
