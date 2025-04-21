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
    return await this.getData(`./checklists/`, {piece_pending_items__not__size: 0});
  }

  async removePiecePendings(id: string): Promise<void> {
    // await this.removeRecords("./checklists/", targetValues);
  }
}
