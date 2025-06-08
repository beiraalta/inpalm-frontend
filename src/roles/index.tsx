import { crudAtom } from "./atom";
import { CrudComponent } from "@/shared/components/crud";
import { defaultLanguage } from "@/shared/constants/languages";
import { RoleService } from "./service";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export function RoleComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new RoleService(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function setOnFind() {
    setCrud((previous) => ({
      ...previous,
      onFind: async (searchParams) => {
        await service.initialize();
        return await service.findRoles(searchParams);
      },
    }));
  }

  async function setOnRemove() {
    setCrud((previous) => ({
      ...previous,
      onRemove: async (targetValues) => {
        await service.initialize();
        await service.removeRoles(targetValues);
      },
    }));
  }

  return (
    <CrudComponent
      crudAtom={crudAtom}
      itemKeys={["name"]}
      itemNames={[defaultLanguage.INFO.NAME]}
      title={defaultLanguage.INFO.ROLES}
      urlForm="/protected/roles/form"
    />
  );
}
