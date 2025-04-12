import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { TextInput, View, Text } from "react-native";

type InputFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  label: string;
  path: Path<TFieldValues>;
  placeholder?: string;
}>;

export default function InputField<TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
) {

  const placeholder = props.placeholder?? `Forneça o campo ${props.label}`

  return (
    <Controller
      name={props.path}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <View>
          <Text style={fieldStyle.label}>{props.label}</Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            onChangeText={onChange}
            value={value}
            ref={ref}
            style={fieldStyle.element}
          />
          {fieldState.error && (
            <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
