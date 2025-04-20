import { ChecklistType, TechnicalReportType } from "./custom_types";
import { Backend } from "@/shared/services/backend";

export class ChecklistService extends Backend {

  async addChecklist(checklist: ChecklistType): Promise<ChecklistType> {
    const options = { json: checklist };
    const record: ChecklistType = await this.post("./checklists/", options);
    return record;
  }

  async editChecklist(targetValue: string, checklist: ChecklistType): Promise<ChecklistType> {
    const options = { json: checklist };
    return await this.put(`./checklists/${targetValue}/`, options);
  }

  async findChecklists(urlSearchParams?: any): Promise<ChecklistType[]> {
    return await this.getRecords("./checklists/", urlSearchParams);
  }

  async findTechnicalReports(id: string): Promise<TechnicalReportType[]> {
    return await this.getData(`./checklists/${id}/technical-reports/`);
  }

  async removeChecklists(targetValues: string[]): Promise<void> {
    await this.removeRecords("./checklists/", targetValues);
  }

}
