import { APIResponse, Records, T } from "./types";
import { Storage } from "@/utils/storage";
import ky, { KyInstance, Options } from "ky"

export default class AbstractService {
  http: KyInstance
  url: string

  constructor(url: string) {
    this.url = url;
    this.http = ky.create({prefixUrl: this.url});
  }

  async initialize(): Promise<void> {
    const authToken = await Storage.getItem("authToken") ?? "";
    this.http = ky.create({ 
      prefixUrl: this.url, 
      headers: { authorization: authToken } 
    });
  }

  async get(url: string, urlSearchParams: any = {}): Promise<T[]> {
    try {
      const searchParams = new URLSearchParams(urlSearchParams);
      const response = await this.http.get(url, { searchParams });
      const apiResponse = await response.json<APIResponse<Records<T>>>();
      return apiResponse?.data?.records;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async handleError(error: any): Promise<Error> {
    if (error.response) {
      const apiResponse: APIResponse<T> = await error.response.json();
      return new Error(apiResponse.message);
    } else {
      return error;
    }
  }

  async post(url: string, options?: Options): Promise<T[]> {
    try {
      const response = await this.http.post(url, options);
      const apiResponse = await response.json<APIResponse<T>>();
      return apiResponse.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

}
