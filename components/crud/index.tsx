import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/constants/styles";
import { T } from "@/services/types";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import Spinner from "../spinner";

export type CrudProps = Readonly<{
  targetKey: string;
  itemKeys: any[];
  itemNames: string[];
  // onAddItem: (item: T) => Promise<T>;
  // onEditItem: (id: string, item: T) => Promise<T>;
  onGetItems: () => Promise<T>;
  onRemoveItems: (ids: string[]) => Promise<T>;
  title: string;
  urlForm: string;
}>;

export default function CrudComponent(props: CrudProps): ReactNode {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const targetKey = props.targetKey || "id";

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    props.itemKeys.some((key) =>
      item[key]?.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  function openAddForm() {
    router.navigate(props.urlForm);
  }

  function openEditForm(target: string) {
    router.navigate(`${props.urlForm}/?${props.targetKey}=${target}`);
  }

  async function removeItem(target: string) {
    if (
      confirm(
        "Você deseja remover este registro? Esta operação não pode ser desfeita!",
      )
    ) {
      setIsLoading(true);
      await props.onRemoveItems([target]);
      setItems(items.filter((item: any) => item[targetKey] !== target));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const _setItems = async () => {
      const items = await props.onGetItems();
      setItems(items);
      setIsLoading(false);
    };
    _setItems();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textTitle}>{props.title}</Text>
      {/* Search Input */}
      <TextInput
        style={globalStyles.inputForm}
        placeholder={"Buscar..."}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={openAddForm}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* List */}
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
                  onPress={() => openEditForm(item[targetKey])}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeItem(item[targetKey])}
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
