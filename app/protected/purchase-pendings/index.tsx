import { PurchasePendingService } from "./service";
import { crudAtom } from "./atom";
import { CrudComponent } from "@/shared/components/crud";
import { defaultLanguage } from "@/shared/constants/languages";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export default function ChecklistComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new PurchasePendingService(), []);

  useEffect(() => {
    setOnFind();
    setOnRemove();
  }, []);

  async function setOnFind() {
    setCrud((previous) => ({
      ...previous,
      onFind: async (searchParams) => {
        await service.initialize();
        return await service.findPurchasePendings(searchParams);
      },
    }));
  }

  async function setOnRemove() {
    setCrud((previous) => ({
      ...previous,
      onRemove: async (targetValues) => {
        await service.initialize();
        await service.removePurchasePendings(targetValues);
      },
    }));
  }

  return (
    <CrudComponent
      crudAtom={crudAtom}
      itemKeys={[
        "customer",
        "project_code",
      ]}
      itemNames={[
        defaultLanguage.INFO.CUSTOMER,
        defaultLanguage.INFO.PROJECT_CODE,
      ]}
      title={defaultLanguage.INFO.PURCHASE_PENDINGS}
      urlForm="/protected/purchase-pendings/form"
    />
  );
}
