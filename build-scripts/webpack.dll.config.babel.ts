import webpack from "webpack";
import { absolutePath } from "./env";

/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
  不太好用，官方都已经放弃使用该技术了
*/
const webpackDllConfig: webpack.Configuration = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    react: ["react"],
    reactDom: ["react-dom"],
  },
  output: {
    path: absolutePath("./build/dll"),
    filename: "[name].dll.js",
    library: "dll_[name]_[fullhash]", // 打包的库里面向外暴露出去的内容叫什么名字
    clean: {
      keep: /.+\.manifest\.json$/,
    },
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: "dll_[name]_[fullhash]", // 映射库的暴露的内容名称
      path: absolutePath("./build/dll/[name].manifest.json"), // 输出文件路径，绝对路径
    }),
  ],
  mode: "development",
};

export default webpackDllConfig;

/**
 * 热模块更新 HMR hot module reload
 * 动态链接库 DLL dynamic link library
 */
