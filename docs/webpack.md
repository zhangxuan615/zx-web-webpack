# webpack 基本配置

```js
export default {
    mode: "",
    entry: {},
    output: {},
    resolve: {},
    
    module: { rules: [], },
    plugins: [],
    optimization: {},
    devServer: {}
}
```



# output

`filename`: `string`

决定每个 ` initial chunk/bundle` 名称，会在 `html  ` 直接引入  `initial` 文件，

对应于 `splitChunks.chunks = "initial"`

`chunkFilename`: `string`

决定每个 `non-initial chunk/bundle` 名称，异步引入，不会直接在 `html` 文件中引入

对应于 `splitChunks.chunks = "async"`

二者均只能使用相对路径，基于 `output.path`，该值为一个绝对路径







# optimization.splitChunks

## 默认值

```js
const default_splitChunks = {
  splitChunks: {
    chunks: "async",
    minSize: 20000,
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};
```

## 核心属性

`chunks`: `"async"` | `"initial"` | `"all"`

每个 import 引入的文件都引用一种 `chunks` 类型，`"async"` 或者 `"initial"`，由初始引入的文件 `chunks` 雷西那个决定

1. 入口文件 - `entry-point`:  `chunks` 类型一定为 `initial`
   - 由入口文件引入产生的 `import` 引用链路上的所有引入的 `chunks` 均为 `initial`
2. 懒加载文件：`chunks` 类型一定为 `async`
   - 由懒加载文件引入产生的 `import` 引用链路上的所有引入的 `chunks` 均为 `async`

3. 某个 `import` 引入既在1.入口文件引用链路，也在2.懒加载引用链路上，此时入口文件引用链路具有更高的优先级，所有该引用的 `chunks` 为 `initial`

`minChunks`: `number`

**模块的重复调用次数大于等于 `minChunks` 值时，就会满足这项拆包条件**，但只看入口模块导入的，不看动态加载模块中导入的，所谓的调用次数，就是看有几个入口点，一个入口点相同于一次

一般取默认值 `1`，正常不需要改动这一项

`test`: `Regex` | `string` 

根据引入文件的绝对路径进行匹配

------

`minSize`: number

生成的 `chunk` 块的源码的最小体积，小于该体积则不生成单独的 `chunk` 快

`maxInitialRequests`: number

拆分得到的 `initial chunk/bundle` 文件块的数量，即在 `html` 直接文件的数量，用于限制分包数量，当分包数量过多时，发起的请求过多反而得不偿失

**当包的体积超过`enforceSizeThreshold`时，就会无视 `maxInitialRequests` 数量限制**

`maxAsyncRequests`: number

拆分得到的 `non-initial chunk/bundle`  也即 `async` 文件块的数量，用于限制异步模块分包数量

**当包的体积超过`enforceSizeThreshold`时，就会无视 `maxAsyncRequests` 数量限制**



## 整体逻辑

前置判断

根据 `test` / `minChunks` / `chunks` 绝对是否启动某个 `cacheGroups` 中的拆包分组

**当前模块的引用类型不满足`chunks` 配置，则当前分组不会直接忽略，不会进入**

------

后置决断

根据 `minSize` / `maxInitialRequests` / `maxAsyncRequests` 决定是否最终采用该拆包分组作为拆包的结果

**`enforceSizeThreshold`: 能够强制忽略 `maxInitialRequests` 与 `maxAsyncRequests` 的影响**

**`enforce`: 能够强制忽略 `minChunks` `minSize` `maxInitialRequests` 与 `maxAsyncRequests` 的影响**











































