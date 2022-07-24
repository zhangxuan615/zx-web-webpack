import axios from 'axios';

const BASE_URL = '/api';
export const reqApiAjax = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: false //跨域请求是否允许携带 cookie  xhr.withCredentials
});

// 响应拦截
reqApiAjax.interceptors.response.use(
  res => {
    // 业务处理响应成功
    const resData = res.data && typeof res.data === 'object' ? res.data : {};
    return {
      ...res,
      data: {
        ...resData,
        st: resData.st ?? -1
      }
    };
  },
  err => {
    /**
     * 系统错误
     * 错误类型： 400 500
     */
    const { response } = err;
    if (response) {
      switch (response.status) {
        case 400:
          err.message = '请求错误';
          break;
        case 500:
          err.message = '服务端错误';
          break;
        default:
          err.message = `错误信息 ${response.status}: ${response.statusText}`;
      }
    } else {
      err.message = window.navigator.onLine ? '连接到服务器失败' : '网络未连接';
    }

    return Promise.reject(err);
  }
);
