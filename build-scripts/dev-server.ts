import webpackDevServer from "webpack-dev-server";

import history from "connect-history-api-fallback";
import { PORT } from "./env";

const devServer: webpackDevServer.Configuration = {
  port: PORT, // 端口号
  open: false, //  是否自动打开浏览器
  /**
   * HMR: hot module replacement 热模块替换 / 模块热替换
   * 作用：一个模块发生变化，只会重新打包这一个模块(而不是打包所有模块)，极大提升构建速度
   * 样式文件：
   *   1. 可以使用 HMR 功能：因为 style-loader 内部实现了~
   *      这也是为什么在开发环境使用 style-loader，就是借助这个loader能够自动帮助我们
   *      实现hmr功能，而在生产环境使用提取css，就不需要这个功能了
   *   2. js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持 HMR 功能的代码
   *      注意：HMR 功能对 js 的处理，只能处理非入口 js 文件的其他文件
   *   3. html文件: 默认不能使用HMR功能.同时会导致问题：
   *      html一般不需要热替换，一般只有一个，不存在一个变化要保持其他不变的情况出现
   *      html文件不能热更新了~ （不用做HMR功能，一个遍都会变，全量加载）
   */
  hot: true, // 默认值为 true
  // client: {
  //   overlay: {
  //     errors: true,
  //     warnings: false,
  //   },
  // },
  setupMiddlewares: function (middlewares, devServer) {
    if (!devServer) {
      throw new Error("webpack-dev-server is not defined");
    }

    // 作用同 historyApiFallback: true, 用来支持 spa 页面的重刷
    // devServer.app?.use(history({ index: "/index.html" }));
    middlewares.unshift(history({ index: "/index.html" }));
    return middlewares;
  },
  // 反向代理
  proxy: [
    {
      context: ["/api"],
      target: "http://localhost:8002",
    },
  ],
};

export default devServer;
