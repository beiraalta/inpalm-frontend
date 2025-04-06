import { crudAtom } from "@/shared/components/crud";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { globalStyles } from "@/shared/constants/styles";
import { OmniAuth } from "@/shared/services/omniauth";
import { Text, TextInput } from "react-native";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export default function Screen() {
  const [crud, setCrud] = useAtom(crudAtom);
  const omniAuth = useMemo(() => new OmniAuth(), []);

  useEffect(() => {
    setOnAdd();
    setOnEdit();
  }, []);

  function setOnAdd() {
    setCrud((previous) => ({ ...previous, onAdd: async (formData) => {
      if (formData.password !== formData.confirmPassword) {
        throw Error("A senha e a confirmação não batem. Corrija, por favor.");
      }      
      await omniAuth.initialize();
      return await omniAuth.addAccount({
        name: formData.name,
        user: formData.user,
        password: formData.password,
      });
    }}));
  }

  function setOnEdit() {
    setCrud((previous) => ({ ...previous, onEdit: async (targetValue, formData) => {
      await omniAuth.initialize();
      return await omniAuth.editAccount(targetValue, {
        name: formData.name,
        user: formData.user,
      });
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

        autoCapitalize="none"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        onChangeText={(text) => crud.onChangeFormData("user", text)}
        placeholder="Digite o e-mail do usuário"
        placeholderTextColor="gray"
        textContentType="emailAddress"

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
            onChangeText={(text) => crud.onChangeFormData("confirmPassword", text)}
            placeholder="Confirme a senha do usuário"
            placeholderTextColor="gray"
            secureTextEntry
            style={globalStyles.inputForm}
            value={crud.formData.confirmPassword}
          />
        </>
      )}
    </CrudFormComponent>
  );
}