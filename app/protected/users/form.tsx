import { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";


export type FormProps = Readonly<{
  name: string,
}>;
 
export function UserForm(props: FormProps): ReactNode {
  return <Text style={styles.boldText}>{props.name}</Text>;
}

const styles = StyleSheet.create({
  boldText: {
    marginTop: 10,
    fontWeight: "bold",
  }
});