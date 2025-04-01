import { globalStyles } from "@/constants/styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { T } from "@/services/types";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import Spinner from "../spinner";
import useFormData from "@/hooks/form-data";

export type FormProps = Readonly<{
  children: ReactNode;
  formData: T;
  onAddItem: (item: T) => Promise<T>;
  onEditItem: (targetKey: string, targetValue: any, item: T) => Promise<T>;
  onGetItems: (urlSearchParams: {}) => Promise<T[]>;
  targetKey?: string;
  title: string;
}>;

export default function FormComponent(props: FormProps) {
  const targetKey = props.targetKey ?? "id";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {
    formData,
    isEditing,
    setFormData,
    targetValue,
  } = useFormData(props.formData, targetKey);


  async function onSubmit() {
    setIsLoading(true);
    try {
      if (isEditing) {
        await props.onEditItem(targetKey, targetValue, formData);
      } else {
        await props.onAddItem(props.formData);
      }
    } catch(error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      router.back();
    }
  }

  useEffect(() => {
    const _setFormData = async () => {
      if (isEditing) {
        const items = await props.onGetItems({ targetKey: targetValue });
        const item = items[0];
        setFormData(item);
      }
      setIsLoading(false);
    };
    _setFormData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textTitle}>
        {isEditing ? "Editar " : "Adicionar"} {props.title}
      </Text>
      {props.children}
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
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
