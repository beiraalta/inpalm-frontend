import { buttonStyle } from "../buttons/styles";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { T } from "@/shared/custom_types";
import React, { ReactNode } from "react";

type DynamicListFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  label: string;
  path: Path<TFieldValues>;
  nodes: ReactNode;
  onClickAddButton: () => void;
  onRenderItem: (item: T, index: number) => React.ReactNode;
}>;

export default function DynamicListField<TFieldValues extends FieldValues>(
  props: DynamicListFieldProps<TFieldValues>
) {

  return (
    <Controller
      name={props.path}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <View>
          <Text style={fieldStyle.label}>{props.label}</Text>
          <View
            style={{
              backgroundColor: "#f0f0f0",
              borderColor: "#ccc",
              borderRadius: 8,
              borderWidth: 1,
              marginBottom: 10,
              width: "100%",
            }}
          >
            <View style={{ padding: 10, paddingBottom: 0 }}>
              {props.nodes}
              <TouchableOpacity
                style={buttonStyle.button}
                onPress={() => props.onClickAddButton()}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
              <FlatList
                data={value}
                renderItem={({ item, index }) =>
                  props.onRenderItem(item, index)
                }
              />
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    marginLeft: 6,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 6,
    borderRadius: 4,
  },
});
