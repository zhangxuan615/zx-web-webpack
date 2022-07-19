import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { absolutePath, isProduction, isBundleAnalyze, isDev } from "./env";

const originalPlugins: (webpack.WebpackPluginInstance | false)[] = [
  new HtmlWebpackPlugin({
    // 提取 html 文件
    template: absolutePath("./src/index.html"),
    minify: isProduction
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      : false,
  }),
  isProduction &&
    new MiniCssExtractPlugin({
      // 单独抽取 css 文件
      filename: "css/[name]_[chunkhash:8].css",
    }),
  isDev && new ReactRefreshWebpackPlugin(),
  /**
   * 额外工具优化
   *   1. 编译打包的时候展示进度条
   *   2. 编译打包之后分析打包的文件大小
   */
  new ProgressBarPlugin({
    total: 100,
    summary: true,
  }) as unknown as webpack.WebpackPluginInstance,
  isBundleAnalyze && new BundleAnalyzerPlugin(), // 生产打包启动分析
];

const filterPlugins = originalPlugins.filter(
  Boolean
) as webpack.Configuration["plugins"];

export default filterPlugins;
