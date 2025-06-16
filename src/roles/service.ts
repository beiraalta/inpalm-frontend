import { AccountType } from "../accounts/custom_types";
import { ResourceType, RoleType } from "./custom_types";
import { OmniAuth } from "@/shared/services/omniauth";

export class RoleService extends OmniAuth {

  async addRole(account: RoleType): Promise<RoleType> {
    const options = { json: account };
    const record: RoleType = await this.post("./roles/", options);
    return record;
  }

  async editRole(targetValue: string, account: RoleType): Promise<RoleType> {
    const options = { json: account };
    return await this.put(`./roles/${targetValue}/`, options);
  }

  async findAccounts(urlSearchParams?: any): Promise<AccountType[]> {
    return await this.getRecords("./accounts/", urlSearchParams);
  }

  async findResources(urlSearchParams?: any): Promise<ResourceType[]> {
    return await this.getRecords("./resources/", urlSearchParams);
  }

  async findRoles(urlSearchParams?: any): Promise<RoleType[]> {
    return await this.getRecords("./roles/", urlSearchParams);
  }

  async removeRoles(targetValues: string[]): Promise<void> {
    await this.removeRecords("./roles/", targetValues);
  }

}
