import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

type PickerFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  disabled?: boolean;
  label: string;
  path: Path<TFieldValues>;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
}>;

export default function PickerField<TFieldValues extends FieldValues>(
  props: PickerFieldProps<TFieldValues>
) {

  const disabled = props.disabled ?? false;
  const placeholder = props.placeholder?? `Forneça o campo ${props.label}`

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
          <Picker
            enabled={!disabled}
            placeholder={placeholder}
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
            ref={ref}
            style={fieldStyle.element}
          >
            {props.options.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
      )}
    />
  );
}
