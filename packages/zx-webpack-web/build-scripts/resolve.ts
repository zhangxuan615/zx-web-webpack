import webpack from "webpack";
import { absolutePath } from "./env";

const resolve: webpack.Configuration["resolve"] = {
  alias: {
    "@": absolutePath("./src"),
    "@assets": absolutePath("./src/assets"),
    "@routes": absolutePath("./src/routes"),
    "@pages": absolutePath("./src/pages")
  },
  /**
   * webpack 解析模块逻辑:
   *   modules / mainFields / mainFiles / extensions: 优先级按照从下往上，从左往右，遍历所有的可能
   *   1. 根据 modules 字段查找到对应的模块文件位置
   *   2. 判断模块是否有 package.json 文件
   *     2.1 如果存在 package.json 文件
   *       a. 根据 mainFields 字段在模块 package.json 文件中查找对应的入口文件位置
   *         a1: 入口文件为具体文件，则使用该文件，查找结束
   *         a2. 入口文件为文件夹，则执行步骤 b
   *       b. 根据 mainFiles 字段在入口文件夹中查找入口文件
   *       c. 根据 extensions 字段决定使用相同文件名的不同后缀文件
   *   3. 如果步骤2未找到，则按照步骤b/c，根据 mainFiles-extensions 两个字段直接查找
   */
  enforceExtension: false, // 为 true 强制必须使用扩展名称
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // ['.js', '.json'] 优先级从左到右
  mainFiles: ["yyy", "xxx", "index"], // ['index']
  mainFields: ["browser", "module", "main"], // ['browser', 'module', 'main'] 在模块 package.json 查找对应字段
  modules: ["node_modules"] // ["node_modules"] 解析模块时搜索的目录, 一般不用修改
};

export default resolve;
