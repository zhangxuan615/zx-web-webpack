import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
// import AddAssetHtmlWebpackPlugin from "add-asset-html-webpack-plugin";

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
   * 4. minify: 文本压缩
   *   minify: true 强制使用所有对 html 的压缩选项
   *   不设置，默认在 production 模式下为 true
   */
  new HtmlWebpackPlugin({
    template: absolutePath("./src/index.html"),
    filename: "html/index.html",
    // publicPath: "/",
    minify: isProduction
      ? {
          removeComments: true, // 移除注释
          collapseWhitespace: false, // 移除空白字符，回车、换行、空白字符、tab
          keepClosingSlash: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
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
   * 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变~
   */
  // new webpack.DllReferencePlugin({
  //   manifest: absolutePath("./build/dll/react.manifest.json"),
  // }),
  // // 将某个文件打包输出去，并在html中自动引入该资源
  // new AddAssetHtmlWebpackPlugin({
  //   outputPath: "./lib",
  //   // filepath: absolutePath("./build/dll/react.dll.js"),
  //   glob: "./build/dll/react.dll.js",
  //   publicPath: "/lib/",
  // }),
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
