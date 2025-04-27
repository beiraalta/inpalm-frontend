import { AccountType, RoleType } from "./custom_types";
import { OmniAuth } from "@/shared/services/omniauth";

export class AccountService extends OmniAuth {

  async addAccount(account: AccountType): Promise<AccountType> {
    const options = { json: account };
    const record: AccountType = await this.post("./accounts/", options);
    this.addAccountIntoMembers(record);
    return record;
  }

  async editAccount(targetValue: string, account: AccountType): Promise<AccountType> {
    const options = { json: account };
    return await this.put(`./accounts/${targetValue}/`, options);
  }

  async findAccounts(urlSearchParams?: any): Promise<AccountType[]> {
    return await this.getRecords("./accounts/", urlSearchParams);
  }

  async removeAccounts(targetValues: string[]): Promise<void> {
    this.removeAccountIntoMembers(targetValues);
    await this.removeRecords("./accounts/", targetValues);
  }

  private async  findRoles(urlSearchParams?: any): Promise<RoleType[]> {
    return await this.getRecords("./roles/", urlSearchParams);
  }

  private async addAccountIntoMembers(account: AccountType): Promise<void> {
    const targetValue = "67f2de76ff6767691a67ea41";
    const roles: RoleType[] = await this.findRoles({ id: targetValue });
    const role: RoleType = roles[0];
    if (!(role.accounts.some((a) => a.id === account.id))) {
      const options = {json: { accounts: [...role.accounts, { id: account.id, name: account.user }] },};
      await this.put(`./roles/${targetValue}/`, options);
    }
  }

  private async removeAccountIntoMembers(account_ids: string[]): Promise<void> {
    const targetValue = "67f2de76ff6767691a67ea41";
    const roles: RoleType[] = await this.findRoles({ id: targetValue });
    const role: RoleType = roles[0];
    const updatedAccounts = role.accounts.filter((account) => !account_ids.includes(account.id));
    if (updatedAccounts.length !== 0) {
      const options = { json: { accounts: updatedAccounts } };
      await this.put(`./roles/${targetValue}/`, options);
    }
  }

}
