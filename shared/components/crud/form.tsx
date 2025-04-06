import { crudAtom } from "./atom";
import { globalStyles } from "@/shared/constants/styles";
import { isLoadingAtom, Spinner } from "../spinner";
import { ReactNode, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAtom } from "jotai";
import { useLocalSearchParams, useRouter } from "expo-router";

export type CrudFormComponentProps = Readonly<{
  children: ReactNode;
  targetKey?: string;
  title: string;
}>;

export function CrudFormComponent(props: CrudFormComponentProps) {
  const targetKey = props.targetKey ?? "id";
  const targetValue = useLocalSearchParams()[targetKey];
  const isEditing = !!targetValue;
  const router = useRouter();
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    let record = {};
    if (isEditing) {
      const records = crud.items.filter((item: any) =>
        item[targetKey]?.toString().toLowerCase().includes(targetValue)
      );
      record = records[0];
    } 
    setCrud((previous) => ({ ...previous, formData: record }));
    setCrud((previous) => ({ ...previous, isEditing: isEditing }));
    console.log(crud.formData);
  }, [crud.onAdd, crud.onEdit]);

  async function onSubmit() {
    setIsLoading(true);
    try {
      if (isEditing) {
        if (targetValue == undefined) {
          throw new Error("targetValue is undefined");
        }
        const record = await crud.onEdit(targetValue, crud.formData);
        setCrud((previous) => ({
          ...previous,
          items: previous.items.map((item) => item[targetKey] === targetValue ? record : item),
        }));
      } else {
        const record = await crud.onAdd(crud.formData);
        setCrud((previous) => ({
          ...previous,
          items: [record, ...previous.items],
        }));        
      }
      setCrud((previous) => ({ ...previous, formData: {} }));
      router.back();
    } catch(error) {
      alert((error as Error)?.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

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