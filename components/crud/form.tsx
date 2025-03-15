import { globalStyles } from "@/constants/styles";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { useRouter } from "expo-router";

export type FormProps = Readonly<{
  children: ReactNode;
  isEditing: boolean;
  isLoad: any;
  title: string;
  onSubmit: any;
}>;

export default function FormComponent(props: FormProps) {
  const router = useRouter();

  if (props.isLoad) {
    return <ActivityIndicator size="large"></ActivityIndicator>;
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textTitle}>{props.isEditing ? "Editar " : "Adicionar"} {props.title}</Text>
      {props.children}
      <TouchableOpacity style={styles.submitButton} onPress={props.onSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  buttonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { alignItems: "center", padding: 10 },
  cancelText: { color: "#007bff", fontSize: 16 },
  container: { padding: 20, justifyContent: "center" },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});