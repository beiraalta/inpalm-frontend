import { ChecklistService } from "./service";
import { crudAtom, CrudComponent } from "@/shared/components/crud";
import { defaultLanguage } from "@/shared/constants/languages";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export default function ChecklistComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new ChecklistService(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function setOnFind() {
    setCrud((previous) => ({ ...previous, onFind: async (searchParams) => {
      await service.initialize();
      return await service.findChecklists(searchParams);
    }}));
  }

  async function setOnRemove() {
    setCrud((previous) => ({ ...previous, onRemove: async (targetValues) => {
      await service.initialize();
      await service.removeChecklists(targetValues);
    }}));
  }

  return (
    <CrudComponent
      itemKeys={["name", "user"]}
      itemNames={[defaultLanguage.INFO.NAME, defaultLanguage.INFO.EMAIL]}
      title={defaultLanguage.INFO.CHECKLISTS}
      urlForm="/protected/checklists/form"
    />
  );
}