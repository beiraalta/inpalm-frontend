import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const useFormData = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(!!useLocalSearchParams().id);
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();

  const onChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const onSubmit = async () => {
    setIsLoad(true);
    try {
      console.log("Submitting Form Data:", formData);
      router.back();
    } finally {
      setIsLoad(false);
    }
  };

  return {
    formData,
    isEditing,
    isLoad,
    onChange,
    onSubmit,
    setFormData,
  };
};

export default useFormData;
