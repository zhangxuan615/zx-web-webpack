import { AxiosRequestConfig, Method } from "axios";
import { reqApiAjax } from "./ajax";

type RequestMethodType = Extract<Method, "get" | "post">;
interface RequestParamsType {
  [key: string]: unknown;
}
interface ResponseType<T extends {}> {
  st: number;
  data: T | null;
  msg: string;
}
type RequestApiType<T extends {}> = (
  url: string,
  reqParams?: RequestParamsType,
  requestConfig?: AxiosRequestConfig
) => Promise<ResponseType<T>>;

function request<T>(type: RequestMethodType): RequestApiType<T> {
  return async (url, reqParams, axiosRequestConfig) => {
    try {
      const res = await reqApiAjax({
        url,
        method: type,
        params: type === "get" ? reqParams : void 0,
        data: type === "post" ? reqParams : void 0,
        // data: void 0,
        ...axiosRequestConfig,
      });

      /**
       * 业务异常处理
       */
      if (res.data.st !== 0) {
        return Promise.reject(new Error(res.data.msg || "业务处理异常"));
      }

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}

/**
 * 生成主要两类方法
 *   get
 *   post
 */
export const getRequest = request("get");
export const postRequest = request("post");
