// import { Account } from "@/services/types";
import { OmniAuth } from "@/services/omniauth";
import { useMemo } from "react";
import CrudComponent from "@/components/crud";

export default function Screen() {
  const omniAuth = useMemo(() => new OmniAuth(), []);

  async function onGetItems(urlSearchParams: any = {}) {
    await omniAuth.initialize();
    return await omniAuth.findAccounts(urlSearchParams);
  }

  async function onRemoveItems(ids: string[]) {
    await omniAuth.initialize();
    return await omniAuth.removeAccount(ids);
  }

  return (
    <CrudComponent
      itemKeys={["name", "user"]}
      itemNames={["Name", "E-mail"]}
      onGetItems={onGetItems}
      onRemoveItems={onRemoveItems}
      title="Usuários"
      urlForm="/protected/accounts/form"
    />
  );
}
