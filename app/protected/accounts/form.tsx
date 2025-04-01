import { globalStyles } from "@/constants/styles";
import FormComponent from "@/components/crud/form";
import useFormData from "@/hooks/form-data";
import { Account, T } from "@/services/types";
import { Text, TextInput } from "react-native";
import { useMemo, useState } from "react";
import { OmniAuth } from "@/services/omniauth";


export default function Screen() {
  const { formData, onChange } = useFormData({});
  const [ confirmPassword, setConfirmPassword ] = useState("");

  const omniAuth = useMemo(() => new OmniAuth(), []);

  async function onAddItem(item: Account) {
    if (formData.password !== confirmPassword) {
      throw Error("A senha e a confirmação não batem. Corrija, por favor.");
    }
    await omniAuth.initialize();
    return await omniAuth.addAccount(item);
  }

  async function onEditItem(id: string, item: Account) {
    await omniAuth.initialize();
    return omniAuth.editAccount(id, item);
  }

  async function onGetItems(urlSearchParams: any = {}) {
    await omniAuth.initialize();
    return await omniAuth.findAccounts(urlSearchParams);
  }

  return (
    <FormComponent
      formData={formData}
      onAddItem={onAddItem}
      onEditItem={onEditItem}      
      onGetItems={onGetItems}
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
        onChangeText={(text) => onChange("user", text)}
        placeholder="Digite o e-mail do usuário"
        placeholderTextColor="gray"
        style={globalStyles.inputForm}
        value={formData.user}
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
        onChangeText={(text) => setConfirmPassword(text)}
        placeholder="Confirme a senha do usuário"
        placeholderTextColor="gray"
        secureTextEntry
        style={globalStyles.inputForm}
        value={confirmPassword}
      />
    </FormComponent>
  );
}







// import { globalStyles } from "@/constants/styles";
// import FormComponent from "@/components/crud/form";
// import useFormData from "@/hooks/form-data";
// import { Text, TextInput } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// export default function Screen() {
//   const searchParams = useLocalSearchParams();
//   const { formData, isEditing, isLoad, onChange, onSubmit, setFormData } =
//     useFormData(initFormData());

//   function initFormData() {
//     if (searchParams.id) {
//       return {
//         id: searchParams.id,
//         name: "Major",
//         email: null,
//         password: null,
//         confirmPassword: null,
//       };
//     } else {
//       return {
//         name: null,
//         email: null,
//         password: null,
//         confirmPassword: null,
//       };
//     }
//   }

//   return (
//     <FormComponent
//       isEditing={isEditing}
//       isLoading={isLoad}
//       onSubmit={onSubmit}
//       title="Usuário"
//     >
//       {/* Name */}
//       <Text style={globalStyles.textForm}>Nome</Text>
//       <TextInput
//         onChangeText={(text) => onChange("name", text)}
//         placeholder="Digite o nome do usuário"
//         placeholderTextColor="gray"
//         style={globalStyles.inputForm}
//         value={formData.name}
//       />

//       {/* E-mail */}
//       <Text style={globalStyles.textForm}>E-Mail</Text>
//       <TextInput
//         onChangeText={(text) => onChange("email", text)}
//         placeholder="Digite o e-mail do usuário"
//         placeholderTextColor="gray"
//         style={globalStyles.inputForm}
//         value={formData.email}
//       />

//       {/* Password */}
//       <Text style={globalStyles.textForm}>Senha</Text>
//       <TextInput
//         onChangeText={(text) => onChange("password", text)}
//         placeholder="Digite a senha do usuário"
//         placeholderTextColor="gray"
//         secureTextEntry
//         style={globalStyles.inputForm}
//         value={formData.password}
//       />

//       {/* Password Confirmation */}
//       <Text style={globalStyles.textForm}>Confirmação de Senha</Text>
//       <TextInput
//         onChangeText={(text) => onChange("confirmPassword", text)}
//         placeholder="Confirme a senha do usuário"
//         placeholderTextColor="gray"
//         secureTextEntry
//         style={globalStyles.inputForm}
//         value={formData.confirmPassword}
//       />
//     </FormComponent>
//   );
// }
