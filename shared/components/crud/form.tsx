import { CancelButton, SubmitButton } from "../buttons";
import { crudAtom } from "./atom";
import { DefaultLanguage } from "@/shared/constants/languages";
import { globalStyles } from "@/shared/constants/styles";
import { isLoadingAtom, Spinner } from "../spinner";
import { ReactNode, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  }, [crud.onAdd, crud.onEdit]);

  async function onClickSubmitButton() {
    setIsLoading(true);
    try {
      if (isEditing) {
        if (targetValue == undefined) {
          throw new Error("targetValue is undefined");
        }
        const record = await crud.onEdit(targetValue, crud.formData);
        setCrud((previous) => ({
          ...previous,
          items: previous.items.map((item) =>
            item[targetKey] === targetValue ? record : item
          ),
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
    } catch (error) {
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
        {isEditing ? DefaultLanguage.EDIT : DefaultLanguage.ADD} {props.title}
      </Text>
      {props.children}
      <SubmitButton onPress={onClickSubmitButton} />
      <CancelButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "center" },
});
