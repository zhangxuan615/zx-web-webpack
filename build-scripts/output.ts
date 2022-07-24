import webpack from "webpack";
import { absolutePath, isProduction, PORT } from "./env";

const output: webpack.Configuration["output"] = {
  /**
   * path: 控制编译后的文件放到哪里，只能使用绝对路径 target directory
   * filename: 只能使用相对路径 relative path
   *   [name] - 模块名称 [hash]/[chunkhash]/[contenthash] - 编译相关 hash 值
   *   1. 控制编译后生成的文件具体存放到 path 文件夹下的位置
   *   2. 控制编译后生成的文件在 html 入口中的引用位置
   * publicPath: 直接与 filename 拼接用于生成在 html 文件中对 js 文件的引用路径
   *   尽量不要使用一些奇奇怪怪的路径
   *   调试时，html 文件在开发服务器中的位置由此处的 publicPath 决定
   *   html 文件中 js/css 的引用路径由 HtmlWebpackPlugin 中的 publicPath 决定，默认和此处的 publicPath 一致
   *
   * 在生产环境打包时，使用
   *   1. path + filename: 决定文件输出位置
   *   2. publicPath + filename: 决定文件的引用路径
   * 在开发环境调试时，
   *   内存中的文件输出位置 与 文件的引用位置一致，都是由 publicPath + filename 决定
   */
  path: isProduction ? absolutePath("./build") : void 0,
  /**
   * filename: 决定每个 initial chunk/bundle 名称，会在 html 直接引入的文件
   *
   * chunkFilename: 决定每个 non-initial chunk/bundle 名称，异步引入，不会直接在 html 文件中引入
   *   对应 splitChunks.chunks = "async"
   */
  filename: isProduction
    ? "js/initial.[name].[contenthash:8].js"
    : "js/initial.[name].bundle.js",
  chunkFilename: isProduction
    ? "js/async.[name].[contenthash:8].js"
    : "js/async.[name].bundle.js",
  // url 以双斜杠 // 开头的，表示使用同当前页面相同的协议 https/http
  publicPath: `/`, // 相当于全局 publicPath，没有具体设置就使用这里的
  // 代替  CleanWebpackPlugin 插件
  clean: {
    keep: /dll\//,
  },
};

export default output;
