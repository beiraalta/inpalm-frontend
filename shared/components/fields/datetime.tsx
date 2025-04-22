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
                    ? new Date(value).toISOString().slice(0, 16) // trims to "YYYY-MM-DDTHH:MM"
                    : ""
                }
                onChange={(e) => {
                  const selected = new Date(e.target.value);
                  if (!isNaN(selected.getTime())) {
                    onChange(selected.toISOString());
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

// import {
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import { Controller, Control, FieldValues, Path } from "react-hook-form";
// import { fieldStyle } from "./styles";
// import DateTimePicker from "@react-native-community/datetimepicker";

// type DateTimeFieldProps<TFieldValues extends FieldValues> = Readonly<{
//   control: Control<TFieldValues>;
//   label: string;
//   path: Path<TFieldValues>;
// }>;

// export default function DateTimeField<TFieldValues extends FieldValues>(
//   props: DateTimeFieldProps<TFieldValues>
// ) {
//   const [show, setShow] = useState(false);

//   return (
//     <Controller
//       name={props.path}
//       control={props.control}
//       render={({ field: { onChange, ref, value }, fieldState }) => (
//         <View>
//           <Text style={fieldStyle.label}>{props.label}</Text>
//           {fieldState.error && (
//             <Text style={fieldStyle.error}>{fieldState.error.message}</Text>
//           )}
//           {Platform.OS === "web" ? (
//             <input
//               style={fieldStyle.element}
//               type="datetime-local"
//               value={value}
//               ref={ref}
//               onChange={onChange}
//               // onChange={(text) => {
//               //   const selected = new Date(text);
//               //   if (!isNaN(selected.getTime())) {
//               //     onChange(selected);
//               //   }
//               // }}
//             />
//           ) : (
//             <>
//               <TouchableOpacity onPress={() => setShow(true)}>
//                 <Ionicons name="calendar" size={20} color="#000" />
//               </TouchableOpacity>
//               {show && (
//                 <DateTimePicker
//                   value={value ? new Date(value) : new Date()}
//                   mode="datetime"
//                   display="default"
//                   onChange={(event, selectedDate) => {
//                     setShow(Platform.OS === "ios");
//                     if (selectedDate) {
//                       onChange(selectedDate);
//                     }
//                   }}
//                 />
//               )}
//             </>
//           )}
//         </View>
//       )}
//     />
//   );
// }
