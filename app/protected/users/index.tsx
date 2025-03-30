import { omniAuth } from "@/services/omniauth";
import CrudComponent from "@/components/crud";

export default function Screen() {

  return (
    <CrudComponent
      itemKey="id"
      itemKeys={["name", "email"]}
      itemNames={["Name", "E-mail"]}
      loadItems={omniAuth.getAccounts}
      title="Usuários"
      urlForm="/protected/users/form"
      urlGet="/accounts/"
      urlDelete="/accounts/"
    />
  );
}