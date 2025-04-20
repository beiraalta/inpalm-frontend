import { buttonStyle } from "../buttons/styles";
import { DetailCard } from "../card";
import { componentStyle } from "@/shared/components/styles";
import { crudAtom } from "./atom";
import { defaultLanguage } from "@/shared/constants/languages";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { isLoadingAtom, Spinner } from "../spinner";
import { Ionicons } from "@expo/vector-icons";
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
    if (confirm(defaultLanguage.INFO.CONFIRM_REMOVAL)) {
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
    <View style={{ padding: 20 }}>
      <Text style={componentStyle.textTitle}>{props.title}</Text>
      <TextInput
        style={componentStyle.inputFilter}
        placeholder={"Filtrar..."}
        value={customFilter}
        onChangeText={setCustomFilter}
      />
      <TouchableOpacity style={buttonStyle.button} onPress={onClickAddButton}>
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <DetailCard
            buttons={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={[buttonStyle.button, buttonStyle.edit]}
                  onPress={() => onClickEditButton(item[targetKey])}
                >
                  <Ionicons name="pencil" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[buttonStyle.button, buttonStyle.delete]}
                  onPress={() => onClickRemoveButton(item[targetKey])}
                >
                  <Ionicons name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            }
            item={item}
            itemKeys={props.itemKeys}
            itemLabels={props.itemNames}
            targetKey={targetKey}
          />
        )}
      />
    </View>
  );
}
