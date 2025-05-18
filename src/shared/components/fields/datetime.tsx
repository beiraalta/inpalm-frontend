import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";

type DateTimeFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  label: string;
  path: Path<TFieldValues>;
}>;

export default function DateTimeField<TFieldValues extends FieldValues>(
  props: DateTimeFieldProps<TFieldValues>
) {
  const [show, setShow] = useState(false);

  const toLocalISOString = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  return (
    <Controller
      name={props.path}
      control={props.control}
      render={({ field: { onChange, value }, fieldState }) => {
        const parsedDate = value ? new Date(value) : new Date();

        return (
          <View>
            <Text style={fieldStyle.label}>{props.label}</Text>
            {fieldState.error && (
              <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
            )}

            {Platform.OS === "web" ? (
              <input
                type="datetime-local"
                style={fieldStyle.element}
                value={
                  value
                    ? toLocalISOString(new Date(value))
                    : ""
                }
                onChange={(e) => {
                  const selected = new Date(e.target.value);
                  if (!isNaN(selected.getTime())) {
                    onChange(toLocalISOString(selected));
                  }
                }}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Ionicons name="calendar" size={20} color="#000" />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={parsedDate}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(Platform.OS === "ios");
                      if (selectedDate) {
                        onChange(selectedDate.toISOString()); // ensure it matches Zod schema
                      }
                    }}
                  />
                )}
              </>
            )}
          </View>
        );
      }}
    />
  );
}