import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/constants/styles";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";

export type CrudProps = Readonly<{
  itemKey: any;
  itemKeys: any[];
  itemNames: string[];
  loadItems: any;
  title: string;
  urlForm: string;
  urlGet: string;
  urlDelete: string;
}>;

export default function CrudComponent(props: CrudProps): ReactNode {
  const [isLoad, setIsLoad] = useState(false);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    props.itemKeys.some((key) =>
      item[key]?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  async function initItems() {
    setIsLoad(true);
    try {
      const items = []; //await props.loadItems();
      setItems(items);
    }
    finally {
      setIsLoad(false);
    }
  }

  function openAddForm() {
    router.navigate(props.urlForm);
  }

  function openEditForm(target: string) {
    router.navigate(`${props.urlForm}/?${props.itemKey}=${target}`);
  }

  function deleteItem(target: string) {
    if (confirm("Você deseja remover este registro? Esta operação não pode ser desfeita!")) {
      setItems(items.filter((item: any) => item[props.itemKey] !== target));
    }
  }

  useEffect(() => {
    initItems();
  }, []);

  if (isLoad) {
    return <ActivityIndicator size="large"></ActivityIndicator>;
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
        keyExtractor={(item) => item[props.itemKey]?.toString()}
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
                  onPress={() => openEditForm(item[props.itemKey])}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteItem(item[props.itemKey])}
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
