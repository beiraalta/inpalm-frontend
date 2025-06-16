import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import React from "react";

type Option = {
  label: string;
  value: any;
};

type CheckboxListFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  path: Path<TFieldValues>;
  label: string;
  options: Option[];
  disabled?: boolean;
}>;

export default function CheckboxListField<TFieldValues extends FieldValues>({
  control,
  path,
  label,
  options,
  disabled = false,
}: CheckboxListFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { value = [], onChange }, fieldState }) => {
        const toggleOption = (optionValue: string) => {
          const newValue = value.includes(optionValue)
            ? value.filter((v: string) => v !== optionValue)
            : [...value, optionValue];
          onChange(newValue);
        };
        return (
          <View>
            <Text style={fieldStyle.label}>{label}</Text>
            {fieldState.error && (
              <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
            )}
            <View
              style={{
                backgroundColor: "#f0f0f0",
                borderColor: "#ccc",
                borderRadius: 8,
                borderWidth: 1,
                marginBottom: 10,
                padding: 10,
                width: "100%",
              }}
            >
              {options.map((option) => (
                <View
                  key={JSON.stringify(option.value)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Checkbox
                    value={value.includes(JSON.stringify(option.value))}
                    onValueChange={() => toggleOption(JSON.stringify(option.value))}
                    disabled={disabled}
                    style={{ marginRight: 8 }}
                    color="#007bff"
                  />
                  <Text>{option.label}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      }}
    />
  );
}