import { APIResponse, Records, T } from "@/shared/custom_types";
import { Storage } from "@/shared/storage";
import ky, { KyInstance, Options } from "ky";

export class AbstractService {
  http: KyInstance;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.http = ky.create({ prefixUrl: this.url });
  }

  async delete(
    url: string,
    urlSearchParams: any = {},
  ): Promise<APIResponse<T>> {
    try {
      const searchParams = new URLSearchParams(urlSearchParams);
      const response = await this.http.delete(url, { searchParams });
      const apiResponse = await response.json<APIResponse<T>>();
      return apiResponse;
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async get(url: string, urlSearchParams: any = {}): Promise<T[]> {
    try {
      const searchParams = new URLSearchParams(urlSearchParams);
      const response = await this.http.get(url, { searchParams });
      const apiResponse = await response.json<APIResponse<Records<T>>>();
      return apiResponse?.data?.records;
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async initialize(): Promise<void> {
    const authToken = (await Storage.getItem("authToken")) ?? "";
    this.http = ky.create({
      prefixUrl: this.url,
      headers: { authorization: authToken },
    });
  }

  async post(url: string, options?: Options): Promise<T> {
    try {
      const response = await this.http.post(url, options);
      const apiResponse = await response.json<APIResponse<T>>();
      return apiResponse.data;
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async prepareError(error: any): Promise<Error> {
    if (error.response) {
      const apiResponse: APIResponse<T> = await error.response.json();
      return new Error(apiResponse.message);
    } else {
      return error;
    }
  }

  async put(url: string, options?: Options): Promise<T> {
    try {
      const response = await this.http.put(url, options);
      const apiResponse = await response.json<APIResponse<T>>();
      return apiResponse.data;
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async removeRecords(url: string, targetValues: number[] | string[]): Promise<APIResponse<T>> {
    const joined: string = targetValues?.join(",") ?? "";
    if (!joined) {
      throw Error(
        "Ops! Você não selecionou nenhum registro para remover. Escolha pelo menos um 😉",
      );
    }
    return await this.delete(`${url}${joined}/`);
  }
}
