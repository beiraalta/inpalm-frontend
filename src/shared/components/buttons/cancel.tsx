import { buttonStyle } from "./styles";
import { defaultLanguage } from "@/shared/constants/languages";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type SubmitButtonProps = Readonly<{
  label?: string;
  onPress?: () => void;
}>;

export default function CancelButton(props: SubmitButtonProps) {
  const router = useRouter();

  const label = props.label ?? defaultLanguage.INFO.CANCEL;

  const onPress =
    props.onPress ??
    (() => {
      router.back();
    });

  return (
    <TouchableOpacity style={buttonStyle.cancel.button} onPress={onPress}>
      <Text style={buttonStyle.cancel.label}>{label}</Text>
    </TouchableOpacity>
  );
}
