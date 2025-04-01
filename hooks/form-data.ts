import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function useFormData(initialFormData = {}, targetKey= "id") {
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(!!useLocalSearchParams()[targetKey]);
  const [targetValue, setTargetValue] = useState(useLocalSearchParams()[targetKey]);

  function onChange(key: string, value: string) {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  }

  return {
    formData,
    isEditing,
    setFormData,
    targetValue,
    onChange,
  };
}