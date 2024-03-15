import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL =
  "https://tque3jpn1e.execute-api.us-east-1.amazonaws.com/mobile-tha/";

const api = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

export function apiGet(url: string, config?: AxiosRequestConfig) {
  if (config) return api.get(`${url}`, config);

  return api.get(`${url}`);
}

export function apiGetWithParams(
  url: string,
  params: any,
  config?: AxiosRequestConfig
) {
  if (config)
    return api.get(`${url}`, {
      ...config,
      params,
    });

  return api.get(`${url}`, {
    params,
  });
}

export function apiPost(url: string, data: any, config?: AxiosRequestConfig) {
  if (config) return api.post(`${url}`, data, config);

  return api.post(`${url}`, data);
}

export function apiPut(url: string, data: any, config?: AxiosRequestConfig) {
  if (config) return api.put(`${url}`, data, config);

  return api.put(`${url}`, data);
}

export function apiDelete(url: string, config?: AxiosRequestConfig) {
  if (config) return api.delete(`${url}`, config);

  return api.delete(`${url}`);
}

export function emptyRequest(): Promise<AxiosResponse<any, any>> {
  return {} as Promise<AxiosResponse>;
}

export default api;
