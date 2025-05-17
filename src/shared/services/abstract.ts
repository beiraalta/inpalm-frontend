import { APIResponse, Records, T } from "@/shared/custom_types";
import { Storage } from "@/shared/storage";
import * as FileSystem from "expo-file-system";
import ky, { KyInstance, Options } from "ky";
import { defaultLanguage } from "../constants/languages";
import { Platform } from "react-native";

export class AbstractService {
  http: KyInstance;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.http = ky.create({ prefixUrl: this.url });
  }

  async delete(
    url: string,
    urlSearchParams: any = {}
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

  async download(url: string, filename: string): Promise<string> {
    try {
      const response = await this.http.get(url);
      if (!response.ok) {
        throw new Error(defaultLanguage.FAILURE.SOMETHING_WRONG);
      }
      const contentDisposition = response.headers.get("content-disposition");
      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=([^;]+)/i);
        if (match) {
          filename = decodeURIComponent(
            match[1]
              .replace(/(^['"]|['"]$)/g, "")
              .split("''")
              .pop() || filename
          );
        }
      }
      const blob = await response.blob();
      if (Platform.OS === "web") {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
        return filename;
      }
      const fileUri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(fileUri, await blob.text(), {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileUri;
    } catch (error) {
      throw new Error(
        defaultLanguage.FAILURE.SOMETHING_WRONG + " " + error.message
      );
    }
  }

  async get(url: string, urlSearchParams: any = {}): Promise<T[]> {
    try {
      const searchParams = new URLSearchParams(urlSearchParams);
      const response = await this.http.get(url, { searchParams });
      return await response.json<T>();
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async getData(url: string, urlSearchParams: any = {}): Promise<T[]> {
    try {
      const searchParams = new URLSearchParams(urlSearchParams);
      const response = await this.http.get(url, { searchParams });
      const apiResponse = await response.json<APIResponse<T>>();
      return apiResponse?.data;
    } catch (error: any) {
      throw this.prepareError(error);
    }
  }

  async getRecords(url: string, urlSearchParams: any = {}): Promise<T[]> {
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

  async removeRecords(
    url: string,
    targetValues: number[] | string[]
  ): Promise<APIResponse<T>> {
    const joined: string = targetValues?.join(",") ?? "";
    if (!joined) {
      throw Error(defaultLanguage.FAILURE.UNSELECTED_RECORD);
    }
    return await this.delete(`${url}${joined}/`);
  }
}
