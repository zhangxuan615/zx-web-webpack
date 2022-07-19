import webpack from "webpack";
import { absolutePath, isProduction } from "./env";

const output: webpack.Configuration["output"] = {
  /**
   * path: 控制编译后的文件放到哪里，target directory
   * filename:
   *   [name] - 模块名称 [hash]/[chunkhash]/[contenthash] - 编译相关 hash 值
   *   1. 控制
   */
  path: isProduction ? absolutePath("./build") : void 0,
  /**
   *
   */
  filename: isProduction
    ? "js/[name].[contenthash:8].js"
    : "js/[name].bundle.js",
  publicPath: "/",
  clean: true, // 代替  CleanWebpackPlugin 插件
};

export default output;
