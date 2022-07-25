/**
 * 路由菜单
 */
export interface MenuItemType {
  key: string;
  link: string;
  title: string;
}
export interface SubMenuType {
  key: string;
  icon?: string;
  link?: string;
  title: string;
  children?: MenuItemType[];
}

/** 交易模块 */
const tradeMenus: SubMenuType = {
  key: "TRADE",
  icon: "tradeIcon",
  title: "交易",
  children: [
    {
      key: "TRADE_ORDER",
      link: "/trade/order",
      title: "订单"
    },
    {
      key: "TRADE_PRODUCT",
      link: "/trade/product",
      title: "商品"
    },
    {
      key: "TRADE_SALES",
      link: "/trade/sales",
      title: "销售"
    }
  ]
};
/** 账号管理 */
const accountMenus: SubMenuType = {
  key: "ACCOUNT",
  icon: "accountIcon",
  title: "账号",
  children: [
    {
      key: "ACCOUNT_USER_INFO",
      link: "/account/user-info",
      title: "用户信息"
    },
    {
      key: "ACCOUNT_AUTHORITY",
      link: "/account/authority",
      title: "权限"
    }
  ]
};

/** css 模块化 */
const cssModuleMenus = {
  key: "STYLE_MODULE",
  icon: "styleIcon",
  title: "style 模块化",
  children: [
    {
      key: "STYLE_MODULE_CSS_PREPROCESSOR_LESS",
      link: "/style-module/css-preprocessor/less",
      title: "less"
    },
    {
      key: "STYLE_MODULE_CSS_PREPROCESSOR_SCSS",
      link: "/style-module/css-preprocessor/scss",
      title: "scss"
    },
    {
      key: "STYLE_MODULE_CSS_PREPROCESSOR_STYLUS",
      link: "/style-module/css-preprocessor/stylus",
      title: "stylus"
    },
    {
      key: "STYLE_MODULE_CSS_IN_JS_STYLED_COMPONENTS",
      link: "/style-module/css-in-js/styled-components",
      title: "styled-com"
    },
    {
      key: "STYLE_MODULE_CSS_IN_JS_EMOTION",
      link: "/style-module/css-in-js/emotion",
      title: "emotion"
    }
  ]
};

/** fluent-ui */
const fluentUIMenus = {
  key: "FLUENT_UI",
  icon: "fluentUIIcon",
  title: "fluent ui",
  children: [
    {
      key: "FLUENT_UI_QUICK_START",
      link: "/fluent-ui/quick-start",
      title: "quick start"
    }
  ]
};

/** 全部菜单 */
const menuList: SubMenuType[] = [
  {
    key: "HOME",
    link: "/home",
    icon: "homeIcon",
    title: "首页"
  },
  tradeMenus,
  accountMenus,
  cssModuleMenus,
  fluentUIMenus
];

export default menuList;
