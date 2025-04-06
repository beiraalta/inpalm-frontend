import { crudAtom } from "./atom";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import { globalStyles } from "@/shared/constants/styles";
import { isLoadingAtom, Spinner } from "../spinner";
import { useAtom } from "jotai";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export { crudAtom } from "./atom";

export type CrudComponentProps = Readonly<{
  itemKeys: any[];
  itemNames: string[];
  targetKey?: string;
  title: string;
  urlForm: string;
}>;

export function CrudComponent(props: CrudComponentProps) {
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [customFilter, setCustomFilter] = useState("");
  const router = useRouter();
  const targetKey = props.targetKey ?? "id";
  const filteredItems = crud.items.filter((item: any) =>
    props.itemKeys.some((key) =>
      item[key]?.toString().toLowerCase().includes(customFilter.toLowerCase())
    )
  );

  useEffect(() => {
    findItems();
    setOnChangeFormData();
  }, []);

  async function findItems(searchParams: any = {}) {
    setIsLoading(true);
    try {
      const records = await crud.onFind(searchParams);
      setCrud((previous) => ({ ...previous, items: records }));
    }
    catch (error) {
      alert((error as Error)?.message || "An unknown error occurred.");
    }
    finally { 
      setIsLoading(false);
    }
  }

  function onClickAddButton() {
    if (typeof props.urlForm !== 'string') {
      throw new Error("Invalid or missing 'urlForm'. Expected a non-empty string.");
    }
    router.navigate(props.urlForm);
  }

  function onClickEditButton(targetValue: string) {
    if (typeof props.urlForm !== 'string') {
      throw new Error("Invalid or missing 'urlForm'. Expected a non-empty string.");
    }
    if (!targetKey) {
      throw new Error("Missing 'targetKey'. This is required to identify the item to edit.");
    }
    if (!targetValue) {
      throw new Error("Missing 'targetValue'. This is required to locate the target item.");
    }
    router.navigate(`${props.urlForm}/?${targetKey}=${targetValue}`);
  }

  async function onClickRemoveButton(targetValue: number | string) {
    if (
      confirm(
        "Você deseja remover este registro? Esta operação não pode ser desfeita!",
      )
    ) {
      setIsLoading(true);
      await crud.onRemove([targetValue]);
      setCrud((previous) => ({
        ...previous,
        items: previous.items.filter((item) => item[targetKey] !== targetValue),
      }));
      setIsLoading(false);
    }
  }

  function setOnChangeFormData() {
    setCrud((previous) => ({
      ...previous,
      onChangeFormData: (key: string, value: any) => {
        setCrud((_previous) => ({
          ..._previous,
          formData: { ...(_previous.formData ?? {}), [key]: value },
        }));
      },
    }));
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