import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { TextInput, View, Text } from "react-native";
import { defaultLanguage } from "@/shared/constants/languages";

type InputFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  disabled?: boolean;
  height?: number;
  isMultiline?: boolean;
  isNumber?: boolean;
  isSecure?: boolean;
  label: string;
  path: Path<TFieldValues>;
  placeholder?: string;
}>;

export default function InputField<TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
) {
  const disabled = props.disabled ?? false;
  const height = props.height ?? 220;
  const isMultiline = props.isMultiline ?? false;
  const isNumber = props.isNumber ?? false;
  const isSecure = props.isSecure ?? false;
  const numberOfLines = isMultiline ? height / 22 : 1;
  const placeholder =
    props.placeholder ?? defaultLanguage.INFO.PLACEHOLDER(props.label);

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
            editable={!disabled}
            keyboardType={isNumber ? "numeric" : "default"}
            multiline={isMultiline}
            numberOfLines={numberOfLines}
            onChangeText={(text) => {
              if (isNumber) {
                const number = parseFloat(text);
                onChange(isNaN(number) ? undefined : number);
              } else onChange(text);
            }}
            placeholder={placeholder}
            placeholderTextColor="gray"
            ref={ref}
            secureTextEntry={isSecure}
            style={[
              fieldStyle.element,
              isMultiline && {
                height: height,
                paddingVertical: 10,
                textAlignVertical: "top",
              },
            ]}
            value={value}
          />
        </View>
      )}
    />
  );
}
