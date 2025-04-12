import { buttonStyle } from "./styles";
import { DefaultLanguage } from "@/shared/constants/languages";
import { Text, TouchableOpacity } from "react-native";

type SubmitButtonProps = Readonly<{
  label?: string;
  onPress: () => void;
}>;

export default function SubmitButton(props: SubmitButtonProps) {
  const label = props.label ?? DefaultLanguage.SAVE;

  return (
    <TouchableOpacity style={buttonStyle.submit.button} onPress={props.onPress}>
      <Text style={buttonStyle.submit.label}>{label}</Text>
    </TouchableOpacity>
  );
}
