import { buttonStyle } from "./styles";
import { defaultLanguage } from "@/shared/constants/languages";
import { Text, TouchableOpacity } from "react-native";

type SubmitButtonProps = Readonly<{
  label?: string;
  onPress: () => void;
}>;

export default function SubmitButton(props: SubmitButtonProps) {
  const label = props.label ?? defaultLanguage.INFO.SAVE;

  return (
    <TouchableOpacity style={buttonStyle.button} onPress={props.onPress}>
      <Text style={buttonStyle.label}>{label}</Text>
    </TouchableOpacity>
  );
}
