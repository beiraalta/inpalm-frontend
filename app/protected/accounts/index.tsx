import { AccountService } from "./service";
import { crudAtom } from "./atom";
import { CrudComponent } from "@/shared/components/crud";
import { defaultLanguage } from "@/shared/constants/languages";
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
    setCrud((previous) => ({
      ...previous,
      onFind: async (searchParams) => {
        await service.initialize();
        return await service.findAccounts(searchParams);
      },
    }));
  }

  async function setOnRemove() {
    setCrud((previous) => ({
      ...previous,
      onRemove: async (targetValues) => {
        await service.initialize();
        await service.removeAccounts(targetValues);
      },
    }));
  }

  return (
    <CrudComponent
      crudAtom={crudAtom}
      itemKeys={["name", "user"]}
      itemNames={[defaultLanguage.INFO.NAME, defaultLanguage.INFO.EMAIL]}
      title={defaultLanguage.INFO.USERS}
      urlForm="/protected/accounts/form"
    />
  );
}
