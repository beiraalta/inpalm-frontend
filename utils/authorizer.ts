import { OmniAuth } from "@/services/omniauth";
import { Storage } from "./storage";

export class Authorizer {
  static async dropToken() {
    Storage.removeItem("authToken");
  }

  static async getToken(): Promise<string> {
    return (await Storage.getItem("authToken")) ?? "";
  }

  static async isAuthorized() {
    const omniAuth = new OmniAuth();
    omniAuth.initialize();
    const token = await Storage.getItem("authToken");
    const verification = await omniAuth.verifyToken();
    return token !== undefined && verification === true;
  }

  static async saveToken(token: string) {
    Storage.setItem("authToken", token);
  }
}
