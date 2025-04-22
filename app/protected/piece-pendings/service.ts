import { ChecklistService } from "../checklists/service";
import { PiecePendingType } from "./custom_types";

export class PiecePendingService extends ChecklistService {

  async editPiecePendings(
    targetValue: string,
    data: PiecePendingType
  ): Promise<PiecePendingType> {
    const options = { json: data };
    return await this.put(`./checklists/${targetValue}/`, options);
  }

  async findPiecePendings(urlSearchParams?: any): Promise<PiecePendingType[]> {
    urlSearchParams = urlSearchParams || {};
    urlSearchParams.piece_pending_items__not__size = 0;
    return await this.getRecords(`./checklists/`, urlSearchParams);
  }

  async removePiecePendings(id: string): Promise<void> {
    // await this.removeRecords("./checklists/", targetValues);
  }
}
