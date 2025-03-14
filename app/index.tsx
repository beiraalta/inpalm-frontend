import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

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

const buttons = [
  { title: "Checklists", icon: "checkbox", url: "/checklists" },
  { title: "Pendências", icon: "time", url: "/pendings" },
  { title: "Usuários", icon: "person", url: "/users" },
  { title: "Grupos", icon: "people", url: "/groups" },
] as const;

export function GridScreen() {
  const router = useRouter();

  return (
    <>
      <View style={styles.row}>
        {buttons.slice(0, 2).map((button) => (
          <GridButton
            title={button.title}
            icon={button.icon}
            key={button.title}
            onClick={() => {
              router.navigate(button.url);
            }}
          />
        ))}
      </View>
      <View style={styles.row}>
        {buttons.slice(2, 4).map((button) => (
          <GridButton
            title={button.title}
            icon={button.icon}
            key={button.title}
            onClick={() => {
              router.navigate(button.url);
            }}
          />
        ))}
      </View>
    </>
  );
}

const GridButton = ({ title, icon, onClick }) => {
  return (
    <TouchableOpacity style={styles.gridButton} onPress={onClick}>
      <Ionicons name={icon} size={28} color="black" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 120,
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  gridButton: {
    width: "40%",
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
