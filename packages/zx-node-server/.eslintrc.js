module.exports = {
  root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    node: true, // 表示增加 node 中所有的全局变量 Node.js 全局变量和作用域；
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    quotes: [
      2,
      "double",
      {
        avoidEscape: true
      }
    ],
    semi: ["error", "always"]
  }
};
