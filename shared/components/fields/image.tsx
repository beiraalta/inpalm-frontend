import { buttonStyle } from "../buttons/styles";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { fieldStyle } from "./styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type ImageFieldProps<TFieldValues extends FieldValues> = Readonly<{
  control: Control<TFieldValues>;
  label: string;
  path: Path<TFieldValues>;
}>;

export default function ImageField<TFieldValues extends FieldValues>(
  props: ImageFieldProps<TFieldValues>
) {

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
          <TouchableOpacity
            style={buttonStyle.button}
            onPress={async () =>
              await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
              }).then((result) => {
                if (!result.canceled) {
                  const uri = result.assets[0].uri;
                  onChange(uri);
                }
              })
            }
          >
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
          {Boolean(value) && (
            <Image
              source={{ uri: value }}
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                marginBottom: 10,
                width: "100%",
              }}
            />
          )}
        </View>
      )}
    />
  );
}
