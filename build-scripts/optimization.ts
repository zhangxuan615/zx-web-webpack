import webpack from "webpack";
import TerserWebpackPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { isProduction } from "./env";

const optimization: webpack.Configuration["optimization"] = {
  /**
   * 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
   * default true
   */
  minimize: true,
  minimizer: [
    ...(isProduction
      ? [
          new TerserWebpackPlugin({
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true, // 移除 console
              },
            },
          }),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }),
        ]
      : []),
  ],
  splitChunks: {
    chunks: "async",
    minSize: 20000,
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      "vender-react": {
        test: /node_modules[\\/]react/,
        chunks: "all",
        priority: 100,
        name: "vender-react",
      },
      "vender-modules": {
        test: /node_modules[\\/]/,
        chunks: "all",
        priority: 99,
        name: "vender-modules",
      },
      /** 优先级强制占用该配置，直接忽略 */
      "vender-components": {
        test: /src[\\/]components/,
        chunks: "all",
        priority: 100,
        enforce: true,
        name: "vender-components",
      },
      /** 该分组基本无影响，直接忽略 */
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};

export default optimization;
