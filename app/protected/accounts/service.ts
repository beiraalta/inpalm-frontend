import { Account, Role } from "./custom_types";
import { OmniAuth } from "@/shared/services/omniauth";

export class AccountService extends OmniAuth {

  async addAccount(account: Account): Promise<Account> {
    const options = { json: account };
    const record: Account = await this.post("./accounts/", options);
    this.addAccountIntoMembers(record);
    return record;
  }

  async editAccount(targetValue: string, account: Account): Promise<Account> {
    const options = { json: account };
    return await this.put(`./accounts/${targetValue}/`, options);
  }

  async findAccounts(urlSearchParams?: any): Promise<Account[]> {
    return await this.get("./accounts/", urlSearchParams);
  }

  async removeAccounts(targetValues: string[]): Promise<void> {
    this.removeAccountIntoMembers(targetValues);
    await this.removeRecords("./accounts/", targetValues);
  }

  private async  findRoles(urlSearchParams?: any): Promise<Role[]> {
    return await this.get("./roles/", urlSearchParams);
  }

  private async addAccountIntoMembers(account: Account): Promise<void> {
    const targetValue = "67f2de76ff6767691a67ea41";
    const roles: Role[] = await this.findRoles({ id: targetValue });
    const role: Role = roles[0];
    if (!(role.accounts.some((a) => a.id === account.id))) {
      const options = {json: { accounts: [...role.accounts, { id: account.id, name: account.user }] },};
      await this.put(`./roles/${targetValue}/`, options);
    }
  }

  private async removeAccountIntoMembers(account_ids: string[]): Promise<void> {
    const targetValue = "67f2de76ff6767691a67ea41";
    const roles: Role[] = await this.findRoles({ id: targetValue });
    const role: Role = roles[0];
    const updatedAccounts = role.accounts.filter((account) => !account_ids.includes(account.id));
    if (updatedAccounts.length !== 0) {
      const options = { json: { accounts: updatedAccounts } };
      await this.put(`./roles/${targetValue}/`, options);
    }
  }

}
