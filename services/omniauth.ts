import { Account, APIResponse, T } from "./types";
import { REACT_APP_OMNIAUTH_URL } from "../constants/settings";
import AbstractService from "./abstract";

export class OmniAuth extends AbstractService {
  constructor() {
    super(REACT_APP_OMNIAUTH_URL);
  }

  async addAccount(account: Account): Promise<Account> {
    const options = { json: account };
    return await this.post("./accounts/", options);
  }

  async authenticate(user: string, password: string): Promise<string> {
    const options = { json: { user, password } };
    const httpResponse = await this.http.post("./authentications/", options);
    const authToken: string = httpResponse.headers.get("Authorization") ?? "";
    this.http.extend({ headers: { Authorization: authToken } });
    return authToken;
  }

  async editAccount(id: string, account: Account): Promise<Account> {
    const options = { json: account };
    return await this.put(`./accounts/${id}/`, options);
  }

  async findAccounts(urlSearchParams?: any): Promise<Account[]> {
    return await this.get("./accounts/", urlSearchParams);
  }

  async removeAccount(ids?: string[]): Promise<APIResponse<T>> {
    return await this.removeItems("./accounts/", ids);
  }

  async verifyToken(): Promise<boolean> {
    try {
      await this.get("./authentications/verify/");
      return true;
    } catch (error: any) {
      return false;
    }
  }
}
