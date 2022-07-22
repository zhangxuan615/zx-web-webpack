import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { absolutePath, isProduction, isBundleAnalyze, isDev } from "./env";

const originalPlugins: (webpack.WebpackPluginInstance | false)[] = [
  /**
   * 提取 html
   * 1. template: 使用的模板 html 路径
   * 2. filename: 输出的 html 文件名，类似于 output.filename, 但使用绝对路径/相对路径都是参照 output.path
   *   一般来说，应该和 output.path 保持一致，只能使用相对路径
   *   例：'./html/[name].[contenthash:8].html' / '/html/[name].[contenthash:8].html'
   * 3. publicPath: 决定在生成的 html 引用 js/css 时的 publicPath
   *   正常和 output.path 中保持一致即可，默认值
   */
  new HtmlWebpackPlugin({
    template: absolutePath("./src/index.html"),
    filename: "html/index.html",
    // publicPath: "/",
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
      /**
       * 单独抽取 css 文件
       * filename: 输出的 css 文件名，类似于 output.filename, 只能使用相对路径
       */
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
