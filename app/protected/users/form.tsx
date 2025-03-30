import { globalStyles } from "@/constants/styles";
import FormComponent from "@/components/crud/form";
import useFormData from "@/hooks/form-data";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const searchParams = useLocalSearchParams();
  const { formData, isEditing, isLoad, onChange, onSubmit, setFormData } =
    useFormData(initFormData());

  function initFormData() {
    if (searchParams.id) {
      return {
        id: searchParams.id,
        name: "Major",
        email: null,
        password: null,
        confirmPassword: null,
      };
    } else {
      return {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
      };
    }
  }

  return (
    <FormComponent
      isEditing={isEditing}
      isLoad={isLoad}
      onSubmit={onSubmit}
      title="Usuário"
    >
      {/* Name */}
      <Text style={globalStyles.textForm}>Nome</Text>
      <TextInput
        onChangeText={(text) => onChange("name", text)}
        placeholder="Digite o nome do usuário"
        placeholderTextColor="gray"
        style={globalStyles.inputForm}
        value={formData.name}
      />

      {/* E-mail */}
      <Text style={globalStyles.textForm}>E-Mail</Text>
      <TextInput
        onChangeText={(text) => onChange("email", text)}
        placeholder="Digite o e-mail do usuário"
        placeholderTextColor="gray"
        style={globalStyles.inputForm}
        value={formData.email}
      />

      {/* Password */}
      <Text style={globalStyles.textForm}>Senha</Text>
      <TextInput
        onChangeText={(text) => onChange("password", text)}
        placeholder="Digite a senha do usuário"
        placeholderTextColor="gray"
        secureTextEntry
        style={globalStyles.inputForm}
        value={formData.password}
      />

      {/* Password Confirmation */}
      <Text style={globalStyles.textForm}>Confirmação de Senha</Text>
      <TextInput
        onChangeText={(text) => onChange("confirmPassword", text)}
        placeholder="Confirme a senha do usuário"
        placeholderTextColor="gray"
        secureTextEntry
        style={globalStyles.inputForm}
        value={formData.confirmPassword}
      />
    </FormComponent>
  );
}