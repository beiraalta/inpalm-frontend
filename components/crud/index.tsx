import React, { ReactNode, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type CrudProps = Readonly<{
  data: any;
  itemKey: any;
  onItemAdd: (items: any) => any;
  onItemDelete: (id: any) => void;
  title: string;
}>;

export default function CrudComponent(props: CrudProps): ReactNode {
  const [items, setItems] = useState(props.data);
  const [searchText, setSearchText] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to add a new item
  const addItem = (data) => {
    const newItem = props.onItemAdd(data);
    setItems([...items, newItem]);
    setIsFormVisible(false); // Close modal after adding
  };

  // Function to delete an item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item[props.itemKey] !== id));
    props.onItemDelete(id);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder={"Buscar..."}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsFormVisible(true)}
      >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item[props.itemKey].toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item[props.itemKey])}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal with Form */}
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFormVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {props.children && React.cloneElement(props.children, { onSubmit: addItem })}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFormVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { padding: 20 },
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
  deleteButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ff6600",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});



// import React, { ReactNode, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export type CrudProps = Readonly<{
//   children: ReactNode;
//   data: any;
//   itemKey: any;
//   onItemAdd: any;
//   onItemDelete: any;
//   title: string;
// }>;

// export default function CrudComponent(props: CrudProps): ReactNode {
//   const [items, setItems] = useState(props.data);
//   const [searchText, setSearchText] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editedItem, setEditedItem] = useState({});

//   // Filter items based on search query
//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   // Function to add a new item
//   const addItem = () => {
//     const newItem = props.onItemAdd(items);
//     setItems([...items, newItem]);
//   };

//   // Function to delete an item
//   const deleteItem = (id) => {
//     setItems(items.filter((item) => item[props.itemKey] !== id));
//     props.onItemDelete(id);
//   };

//   // Function to enable edit mode
//   const startEditing = (item) => {
//     setEditingId(item[props.itemKey]);
//     setEditedItem(item);
//   };

//   // Function to save edited item
//   const saveEdit = () => {
//     setItems(
//       items.map((item) =>
//         item[props.itemKey] === editingId ? { ...item, ...editedItem } : item
//       )
//     );
//     setEditingId(null);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Input */}
//       <TextInput
//         style={styles.input}
//         placeholder={"Buscar..."}
//         value={searchText}
//         onChangeText={setSearchText}
//       />

//       {/* Add Button */}
//       <TouchableOpacity style={styles.addButton} onPress={addItem}>
//         <Text style={styles.addButtonText}>Adicionar</Text>
//       </TouchableOpacity>

//       {/* List */}
//       <FlatList
//         data={filteredItems}
//         keyExtractor={(item) => item[props.itemKey].toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             {editingId === item[props.itemKey] ? (
//               <View>
//                 <TextInput
//                   style={styles.editInput}
//                   value={editedItem.name}
//                   onChangeText={(text) =>
//                     setEditedItem({ ...editedItem, name: text })
//                   }
//                 />
//                 <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
//                   <Text style={styles.buttonText}>Salvar</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     style={styles.editButton}
//                     onPress={() => startEditing(item)}
//                   >
//                     <Text style={styles.buttonText}>Editar</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.deleteButton}
//                     onPress={() => deleteItem(item[props.itemKey])}
//                   >
//                     <Text style={styles.buttonText}>Remover</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   backButton: {
//     backgroundColor: "#ff6600",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   addButton: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   addButtonText: { color: "#fff", fontWeight: "bold" },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   name: { fontSize: 16, fontWeight: "bold" },
//   buttonContainer: { flexDirection: "row", marginTop: 10 },
//   editButton: {
//     backgroundColor: "#28a745",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   deleteButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5 },
//   saveButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
//   editInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 5,
//     marginBottom: 5,
//   },
// });
