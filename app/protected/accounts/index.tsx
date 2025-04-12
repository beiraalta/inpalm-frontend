import { AccountService } from "./service";
import { crudAtom, CrudComponent } from "@/shared/components/crud";
import { DefaultLanguage } from "@/shared/constants/languages";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export default function AccountComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new AccountService(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function setOnFind() {
    setCrud((previous) => ({ ...previous, onFind: async (searchParams) => {
      await service.initialize();
      return await service.findAccounts(searchParams);
    }}));
  }

  async function setOnRemove() {
    setCrud((previous) => ({ ...previous, onRemove: async (targetValues) => {
      await service.initialize();
      await service.removeAccounts(targetValues);
    }}));
  }

  return (
    <CrudComponent
      itemKeys={["name", "user"]}
      itemNames={[DefaultLanguage.INFO.NAME, DefaultLanguage.INFO.EMAIL]}
      title={DefaultLanguage.INFO.USERS}
      urlForm="/protected/accounts/form"
    />
  );
}