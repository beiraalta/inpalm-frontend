import { crudAtom } from "@/shared/components/crud";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { globalStyles } from "@/shared/constants/styles";
import { OmniAuth } from "@/services/omniauth";
import { Text, TextInput } from "react-native";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

export default function Screen() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [crud, setCrud] = useAtom(crudAtom);
  const omniAuth = useMemo(() => new OmniAuth(), []);

  useEffect(() => {
    setOnAdd();
    setOnEdit();
  }, []);

  function setOnAdd() {
    setCrud((previous) => ({ ...previous, onAdd: async (formData) => {
      await omniAuth.initialize();
      return await omniAuth.addAccount(formData);
    }}));
  }

  function setOnEdit() {
    setCrud((previous) => ({ ...previous, onEdit: async (targetValue, formData) => {
      await omniAuth.initialize();
      return await omniAuth.editAccount(targetValue, formData);
    }}));
  }

  return (
    <CrudFormComponent title="Usuário">
      <Text style={globalStyles.textForm}>Nome</Text>
      <TextInput
        onChangeText={(text) => crud.onChangeFormData("name", text)}
        placeholder="Digite o nome do usuário"
        placeholderTextColor="gray"
        style={globalStyles.inputForm}
        value={crud.formData.name}
      />
      <Text style={globalStyles.textForm}>E-Mail</Text>
      <TextInput
        onChangeText={(text) => crud.onChangeFormData("user", text)}
        placeholder="Digite o e-mail do usuário"
        placeholderTextColor="gray"
        style={globalStyles.inputForm}
        value={crud.formData.user}
      />
      {!crud.isEditing && (
        <>
          <Text style={globalStyles.textForm}>Senha</Text>
          <TextInput
            onChangeText={(text) => crud.onChangeFormData("password", text)}
            placeholder="Digite a senha do usuário"
            placeholderTextColor="gray"
            secureTextEntry
            style={globalStyles.inputForm}
            value={crud.formData.password}
          />

          <Text style={globalStyles.textForm}>Confirmação de Senha</Text>
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirme a senha do usuário"
            placeholderTextColor="gray"
            secureTextEntry
            style={globalStyles.inputForm}
            value={confirmPassword}
          />
        </>
      )}
    </CrudFormComponent>
  );
}