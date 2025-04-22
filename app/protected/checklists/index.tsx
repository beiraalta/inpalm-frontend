import { ChecklistService } from "./service";
import { crudAtom } from "./atom";
import { CrudComponent } from "@/shared/components/crud";
import { defaultLanguage } from "@/shared/constants/languages";
import { isLoadingAtom } from "@/shared/components/spinner";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export default function ChecklistComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const service = useMemo(() => new ChecklistService(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function onClickPrintButton(targetValue: any) {
    setIsLoading(true);
    await service.initialize();
    await service.downloadChecklist(targetValue);
    setIsLoading(false);
  }

  async function setOnFind() {
    setCrud((previous) => ({
      ...previous,
      onFind: async (searchParams) => {
        await service.initialize();
        return await service.findChecklists(searchParams);
      },
    }));
  }

  async function setOnRemove() {
    setCrud((previous) => ({
      ...previous,
      onRemove: async (targetValues) => {
        await service.initialize();
        await service.removeChecklists(targetValues);
      },
    }));
  }

  return (
    <CrudComponent
      onClickPrintButton={onClickPrintButton}
      crudAtom={crudAtom}
      itemKeys={[
        "customer",
        "project_code",
        "assembly_team",
        "delivery_responsible_pnc",
        "inspected_by",
      ]}
      itemNames={[
        defaultLanguage.INFO.CUSTOMER,
        defaultLanguage.INFO.PROJECT_CODE,
        defaultLanguage.INFO.ASSEMBLY_TEAM,
        defaultLanguage.INFO.DELIVERY_RESPONSIBLE_PNC,
        defaultLanguage.INFO.INSPECTED_BY,
      ]}
      title={defaultLanguage.INFO.CHECKLISTS}
      urlForm="/protected/checklists/form"
    />
  );
}
