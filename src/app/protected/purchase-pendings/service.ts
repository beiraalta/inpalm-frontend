import { ChecklistService } from "../checklists/service";
import { PurchasePendingType } from "./custom_types";

export class PurchasePendingService extends ChecklistService {

  async editPurchasePendings(
    targetValue: string,
    data: PurchasePendingType
  ): Promise<PurchasePendingType> {
    const options = { json: data };
    return await this.put(`./checklists/${targetValue}/`, options);
  }

  async findPurchasePendings(urlSearchParams?: any): Promise<PurchasePendingType[]> {
    urlSearchParams = urlSearchParams || {};
    urlSearchParams.purchase_pending_items__not__size = 0;
    return await this.getRecords(`./checklists/`, urlSearchParams);
  }

  async removePurchasePendings(targetValues: string): Promise<void> {
    await this.delete(`./checklists/${targetValues}/purchase-pendings/`);
  }
}
