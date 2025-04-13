import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { TextInput, View, Text } from "react-native";
import { DefaultLanguage } from "@/shared/constants/languages";

type InputFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  isSecure?: boolean;
  label: string;
  path: Path<TFieldValues>;
  placeholder?: string;
}>;

export default function InputField<TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
) {

  const isSecure = props.isSecure?? false;
  const placeholder = props.placeholder?? DefaultLanguage.INFO.PLACEHOLDER(props.label);

  return (
    <Controller
      name={props.path}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <View>
          <Text style={fieldStyle.label}>{props.label}</Text>
          {fieldState.error && (
            <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
          )}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            onChangeText={onChange}
            value={value}
            ref={ref}
            secureTextEntry={isSecure}
            style={fieldStyle.element}
          />
        </View>
      )}
    />
  );
}
