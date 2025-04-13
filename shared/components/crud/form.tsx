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
  onClickSubmitButton: () => void | Promise<void>;
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

  async function setOnSubmit() {
    setCrud((previous) => ({
      ...previous,
      onSubmit: async (formData: any) => {
        setIsLoading(true);
        try {
          if (isEditing) {
            if (!targetValue) {
              throw new Error("targetValue is undefined");
            }
            const record = await previous.onEdit(
              targetValue,
              formData
            );
            setCrud((_previous) => ({
              ..._previous,
              items: _previous.items.map((item) =>
                item[targetKey] === targetValue ? record : item
              ),
            }));
          } else {
            const record = await previous.onAdd(formData);
            setCrud((_previous) => ({
              ..._previous,
              items: [record, ..._previous.items],
            }));
          }
          setCrud((_previous) => ({ ..._previous, formData: {} }));
          router.back();
        } catch (error) {
          alert(
            (error as Error)?.message || DefaultLanguage.FAILURE.SOMETHING_WRONG
          );
        } finally {
          setIsLoading(false);
        }
      },
    }));
  }

  useEffect(() => {
    setOnSubmit();
  }, [crud.onAdd, crud.onEdit, crud.formData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textTitle}>
        {isEditing ? DefaultLanguage.INFO.EDIT : DefaultLanguage.INFO.ADD}{" "}
        {props.title}
      </Text>
      {props.children}
      <SubmitButton onPress={props.onClickSubmitButton} />
      <CancelButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "center" },
});
