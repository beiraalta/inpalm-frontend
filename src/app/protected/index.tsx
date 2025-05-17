import { Authorizer } from "@/shared/authorizer";
import { defaultLanguage } from "@/shared/constants/languages";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { isLoadingAtom, Spinner } from "@/shared/components/spinner";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

export default function HomeComponent() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    const _setIsAuthorized = async () => {
      setIsLoading(true);
      const _isAuthorized = await Authorizer.isAuthorized();
      setIsAuthorized(_isAuthorized);
      setIsLoading(false);
    };
    _setIsAuthorized();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthorized) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/inpalm-banner.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <GridScreen />
    </View>
  );
}

const buttons = [
  { title: defaultLanguage.INFO.CHECKLISTS, icon: "checkbox-outline", url: "/protected/checklists", disable: false },
  // { title: defaultLanguage.INFO.PIECE_PENDINGS_SHORT, icon: "construct-outline", url: "/protected/piece-pendings", disable: false },
  // { title: defaultLanguage.INFO.PURCHASE_PENDINGS_SHORT, icon: "pricetag-outline", url: "/protected/purchase-pendings", disable: false },
  { title: defaultLanguage.INFO.USERS, icon: "person-outline", url: "/protected/accounts", disable: false },
  { title: defaultLanguage.INFO.ROLES, icon: "people-outline", url: "/protected/roles", disable: true },
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
            disabled={button.disable}
          />
        ))}
      </View>
      <View style={styles.row}>
        {buttons.slice(2, 3).map((button) => (
          <GridButton
            title={button.title}
            icon={button.icon}
            key={button.title}
            onClick={() => {
              router.navigate(button.url);
            }}
            disabled={button.disable}
          />
        ))}
      </View>
    </>
  );
}

const GridButton = ({ title, icon, onClick, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.gridButton, disabled && { opacity: 0.5 }]}
      onPress={disabled ? undefined : onClick}
      disabled={disabled}
    >
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
