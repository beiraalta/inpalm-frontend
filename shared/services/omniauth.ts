import { REACT_APP_OMNIAUTH_URL } from "../constants/settings";
import AbstractService from "./abstract";

export class OmniAuth extends AbstractService {
  constructor() {
    super(REACT_APP_OMNIAUTH_URL);
  }

  async authenticate(user: string, password: string): Promise<string> {
    const options = { json: { user, password } };
    const httpResponse = await this.http.post("./authentications/", options);
    const authToken: string = httpResponse.headers.get("Authorization") ?? "";
    this.http.extend({ headers: { Authorization: authToken } });
    return authToken;
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
