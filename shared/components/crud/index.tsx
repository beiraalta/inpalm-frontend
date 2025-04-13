import { crudAtom } from "./atom";
import { DefaultLanguage } from "@/shared/constants/languages";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/shared/constants/styles";
import { isLoadingAtom, Spinner } from "../spinner";
import { RelativePathString, useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

export { crudAtom } from "./atom";

export type CrudComponentProps = Readonly<{
  itemKeys: any[];
  itemNames: string[];
  targetKey?: string;
  title: string;
  urlForm: RelativePathString;
}>;

export function CrudComponent(props: CrudComponentProps) {
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [customFilter, setCustomFilter] = useState("");
  const router = useRouter();
  const targetKey = props.targetKey ?? "id";
  const filteredItems = crud.items.filter((item: any) => {
    if (customFilter.length >= 3) {
      return props.itemKeys.some((key) =>
        item[key]?.toString().toLowerCase().includes(customFilter.toLowerCase())
      );
    }
    return crud.items;
  });

  useEffect(() => {
    onLoad();
  }, [crud.onFind, crud.onRemove]);

  function onClickAddButton() {
    setCrud((previous) => ({ ...previous, formData: {} }));
    setCrud((previous) => ({ ...previous, isEditing: false }));
    router.navigate(props.urlForm);
  }

  function onClickEditButton(targetValue: string) {
    const records = crud.items.filter((item: any) =>
      item[targetKey]?.toString().toLowerCase().includes(targetValue)
    );
    const record = records[0];
    setCrud((previous) => ({ ...previous, formData: record }));
    setCrud((previous) => ({ ...previous, isEditing: true }));
    router.navigate(`${props.urlForm}/?${targetKey}=${targetValue}`);
  }

  async function onClickRemoveButton(targetValue: number | string) {
    if (confirm(DefaultLanguage.INFO.CONFIRM_REMOVAL)) {
      setIsLoading(true);
      await crud.onRemove([targetValue]);
      setCrud((previous) => ({
        ...previous,
        items: previous.items.filter((item) => item[targetKey] !== targetValue),
      }));
      setIsLoading(false);
    }
  }

  async function onLoad(searchParams: any = {}) {
    setIsLoading(true);
    try {
      const records = await crud.onFind(searchParams);
      setCrud((previous) => ({
        ...previous,
        items: records.toSorted((lhs, rhs) =>
          rhs.updated_at.localeCompare(lhs.updated_at)
        ),
      }));
    } catch (error) {
      console.log((error as Error)?.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textTitle}>{props.title}</Text>
      <TextInput
        style={globalStyles.inputForm}
        placeholder={"Filtrar..."}
        value={customFilter}
        onChangeText={setCustomFilter}
      />
      <TouchableOpacity style={styles.addButton} onPress={onClickAddButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item[targetKey]?.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              {props.itemKeys.map((key: any, keyIndex: number) => (
                <View key={item[key]} style={styles.cardContainer}>
                  <Text style={styles.cardContainerName}>
                    {props.itemNames[keyIndex]}:
                  </Text>
                  <Text style={styles.cardContainerValue}>{item[key]}</Text>
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onClickEditButton(item[targetKey])}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onClickRemoveButton(item[targetKey])}
                >
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  cardContainer: { flexDirection: "row", marginBottom: 5 },
  cardContainerName: { fontSize: 16, fontWeight: "bold", marginRight: 5 },
  cardContainerValue: { fontSize: 16 },
  container: { padding: 20 },
  deleteButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5 },
  editButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});
