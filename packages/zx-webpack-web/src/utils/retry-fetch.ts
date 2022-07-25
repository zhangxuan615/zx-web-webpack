/**
 * 请求异常重试
 * @param fetchFunc 请求函数
 * @param tryCnt 最大重试次数
 * @param interval 重试间隔
 */
export function retryFetch<T>(
  fetchFunc: () => Promise<T>,
  maxTryCnt = 3,
  interval = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    fetchFunc()
      .then(resolve)
      .catch(err => {
        setTimeout(() => {
          if (maxTryCnt <= 0) {
            reject(err);
            return;
          }
          retryFetch(fetchFunc, maxTryCnt - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}
