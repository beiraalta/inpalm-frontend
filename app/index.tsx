import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/inpalm-banner.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <GridScreen />
    </View>
  );
}

export function GridScreen() {
  const buttons = [
    { title: "Checklists", icon: "checkbox" },
    { title: "Pendências", icon: "time" },
    { title: "Usuários", icon: "person" },
    { title: "Grupos", icon: "people" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      <View style={styles.row}>
        {buttons.slice(0, 2).map((button, index) => (
          <GridButton key={index} title={button.title} icon={button.icon} />
        ))}
      </View>
      <View style={styles.row}>
        {buttons.slice(2, 4).map((button, index) => (
          <GridButton key={index + 2} title={button.title} icon={button.icon} />
        ))}
      </View>
    </ScrollView>
  );
}

const GridButton = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.gridButton}>
      <Ionicons name={icon} size={28} color="black" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 120,
    marginBottom: 20,
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gridButton: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});