import { OmniAuth } from "@/services/omniauth";
import { useEffect, useMemo } from "react";
import { crudAtom, CrudComponent } from "@/components/crud";
import { useAtom } from "jotai";

export default function Screen() {
  const [crud, setCrud] = useAtom(crudAtom);
  const omniAuth = useMemo(() => new OmniAuth(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function setOnFind() {
    setCrud((previous) => ({ ...previous, onFind: async (searchParams) => {
      await omniAuth.initialize();
      return await omniAuth.findAccounts(searchParams);
    }}));
  }

  async function setOnRemove() {
    setCrud((previous) => ({ ...previous, onRemove: async (targetValues) => {
      await omniAuth.initialize();
      await omniAuth.removeAccounts(targetValues);
    }}));
  }

  return (
    <CrudComponent
      itemKeys={["name", "user"]}
      itemNames={["Name", "E-mail"]}
      title="Usuários"
      urlForm="/protected/accounts/form"
    />
  );
}