import path from "path";

const processEnv = process.env as {
  NODE_ENV?: "development" | "production";
  BUNDLE_ANNALYZE?: "analysis";
};

// 根据相对路径计算绝对路径
// 一定要是在项目的根目录执行，使用 process.cwd() 获取项目根目录
const absolutePath = (relativePath: string) => path.resolve(process.cwd(), relativePath);

// 环境变量
const { NODE_ENV = "production", BUNDLE_ANNALYZE } = processEnv;

// 开发环境
const isDev = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";
const isBundleAnalyze = isProduction && BUNDLE_ANNALYZE === "analysis";

// 是否生成 source map
export const shouldUseSourceMap = true;

// 开发服务器配置
export const PORT = process.env.port || 8001;

export { NODE_ENV, isDev, isProduction, isBundleAnalyze, absolutePath };
