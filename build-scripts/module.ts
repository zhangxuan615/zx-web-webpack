import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { absolutePath, isDev } from "./env";

const module: webpack.Configuration["module"] = {
  rules: [
    /**
     * 需要优先执行的 loader
     * {
     *   test: 'xxx',
     *   exclude: 'xxx',
     *   enforce: 'pre',
     *       ** pre 优先处理  normal 正常处理（默认） inline 其次处理 post 最后处理
     *       ** 相同级别的按照顺序执行
     *   loader: 'xxx',
     *   options: {}
     * }
     */
    // 这里的 loader 每个文件只会按照顺序匹配第一个
    // 处理 ts/tsx 文件
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader", // 默认使用 babel.config.js 配置文件
      options: {
        presets: [],
        plugins: [isDev && "react-refresh/babel"].filter(Boolean),
        configFile: "./build-scripts/babel-config.js",
      },
    },
    // 处理样式 less 文件
    {
      // 处理less资源
      test: /\.less$/,
      // exclude: /node_modules/,  // 不需要在这里排除 node_modules 中的 less 样式
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: (resourcePath: string) =>
                !resourcePath.includes("node_modules"), // 区别 node_modules 与 自己代码
              localIdentName: "_[local]__[hash:base64:5]",
            },
          },
        },
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    /**
     * 处理图片资源
     * outputPath: 相当于 output.path
     * name: 相当于 filename
     * publicPath: 相当于 output.publicPath
     */
    {
      test: /\.(png|jpe?g|gif)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 5 * 1024, // 4kb
        },
      },
      generator: {
        // outputPath: "./assets/img",
        filename: "assets/imgs/[name]_[contenthash:5][ext]",
        // publicPath: "/assets/imgs/",
      },
    },
    /**
     * 处理一般文件资源: 字体 ttf
     */
    {
      test: /\.(ttf)$/,
      type: "asset/resource",
      generator: {
        // outputPath: "./assets/fonts",
        filename: "assets/fonts/[name]_[contenthash:8][ext]",
        // publicPath: "/assets/fonts/",
      },
    },
  ],
};

export default module;
