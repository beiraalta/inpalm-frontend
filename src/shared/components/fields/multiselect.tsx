import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { defaultLanguage } from "@/shared/constants/languages";
import { fieldStyle } from "./styles";
import { MultiSelect } from "react-native-element-dropdown";
import { View, Text } from "react-native";

type Option = {
  label: string;
  value: string | number;
};

type MultiSelectFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  path: Path<TFieldValues>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}>;

export default function MultiSelectField<TFieldValues extends FieldValues>(
  props: MultiSelectFieldProps<TFieldValues>
) {
  const disabled = props.disabled ?? false;
  const placeholder = props.placeholder ?? defaultLanguage.INFO.PLACEHOLDER(props.label);

  return (
    <Controller
      name={props.path}
      control={props.control}
      render={({ field: { onChange, value }, fieldState }) => (
        <View style={{ marginBottom: 5 }}>
          <Text style={fieldStyle.label}>{props.label}</Text>
          {fieldState.error && (
            <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
          )}
          <MultiSelect
            style={[fieldStyle.element]}
            data={props.options}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value ?? []}
            onChange={onChange}
            selectedStyle={{ borderRadius: 12 }}
            placeholderStyle={{ color: "gray" }}
            disable={disabled}
            maxSelect={props.options.length}
            renderItem={(item) => (
              <Text style={{ padding: 5 }}>{item.label}</Text>
            )}
          />
        </View>
      )}
    />
  );
}