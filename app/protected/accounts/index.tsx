// import { Account } from "@/services/types";
import { OmniAuth } from "@/services/omniauth";
import { useMemo } from "react";
import CrudComponent from "@/components/crud";

export default function Screen() {
  const omniAuth = useMemo(() => new OmniAuth(), []);

  // async function onAddItem(item: Account) {
  //   await omniAuth.initialize();
  //   return await omniAuth.addAccount(item);
  // }

  // async function onEditItem(id: string, item: Account) {
  //   await omniAuth.initialize();
  //   return omniAuth.editAccount(id, item);
  // }

  async function onGetItems() {
    await omniAuth.initialize();
    return await omniAuth.findAccounts();
  }

  async function onRemoveItems(ids: string[]) {
    await omniAuth.initialize();
    return await omniAuth.removeAccount(ids);
  }

  return (
    <CrudComponent
      // targetKey="id"
      itemKeys={["name", "user"]}
      itemNames={["Name", "E-mail"]}
      // onAddItem={onAddItem}
      // onEditItem={onEditItem}
      onGetItems={onGetItems}
      onRemoveItems={onRemoveItems}
      title="Usuários"
      urlForm="/protected/accounts/form"
    />
  );
}
