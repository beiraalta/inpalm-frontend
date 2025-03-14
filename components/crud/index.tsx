import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CrudComponent = ({ data, title, itemKey, onItemAdd, onItemDelete }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to add a new item
  const addItem = () => {
    const newItem = onItemAdd(items);
    setItems([...items, newItem]);
  };

  // Function to delete an item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item[itemKey] !== id));
    onItemDelete(id);
  };

  // Function to enable edit mode
  const startEditing = (item) => {
    setEditingId(item[itemKey]);
    setEditedItem(item);
  };

  // Function to save edited item
  const saveEdit = () => {
    setItems(
      items.map((item) =>
        item[itemKey] === editingId ? { ...item, ...editedItem } : item
      )
    );
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder={`Buscar ${title}...`}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item[itemKey].toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingId === item[itemKey] ? (
              <View>
                <TextInput
                  style={styles.editInput}
                  value={editedItem.name}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, name: text })
                  }
                />
                <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEditing(item)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteItem(item[itemKey])}
                  >
                    <Text style={styles.buttonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { padding: 10 },
  backButton: {
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  editButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5 },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
});

export default CrudComponent;
