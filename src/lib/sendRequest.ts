import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const BASE_URL = process.env.REACT_APP_HOST
  ? process.env.REACT_APP_HOST + "/api/"
  : "/api/";

export async function sendRequest(
  path: string,
  method: "get" | "post" | "patch" | "put" | "delete",
  putToken: boolean,
  data: any = {},
  headersOptions: { [key: string]: string } = {}
): Promise<any | Error> {
  try {
    let headers: AxiosRequestConfig<any> & AxiosRequestHeaders = {};

    if (putToken)
      headers["Authorization"] = localStorage.getItem("token") || "";

    if (Object.keys(headersOptions).length) {
      for (const key in headersOptions) {
        headers[key] = headersOptions[key];
      }
    }

    const parameters: {
      url: string;
      data?: any;
      config?: AxiosRequestConfig<any> | undefined;
    } = {
      url: BASE_URL + path,
      data,
      config: { headers },
    };

    if (method === "get") {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.get(parameters.url, parameters.config);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    } else if (method === "delete") {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios[method](
            parameters.url,
            parameters.config
          );
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios[method](
            parameters.url,
            parameters.data,
            parameters.config
          );
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    }
  } catch (error) {
    return error;
  }
}
