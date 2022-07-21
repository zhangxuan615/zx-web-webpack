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
const tradeMenu: SubMenuType = {
  key: "TRADE",
  icon: "tradeIcon",
  title: "交易",
  children: [
    {
      key: "TRADE_ORDER",
      link: "/trade/order",
      title: "订单",
    },
    {
      key: "TRADE_PRODUCT",
      link: "/trade/product",
      title: "商品",
    },
    {
      key: "TRADE_SALES",
      link: "/trade/sales",
      title: "销售",
    },
  ],
};
/** 账号管理 */
const accountMenu: SubMenuType = {
  key: "ACCOUNT",
  icon: "accountIcon",
  title: "账号",
  children: [
    {
      key: "ACCOUNT_USER_INFO",
      link: "/account/user-info",
      title: "用户信息",
    },
    {
      key: "ACCOUNT_AUTHORITY",
      link: "/account/authority",
      title: "权限",
    },
  ],
};

/** 全部菜单 */
const menuList: SubMenuType[] = [
  {
    key: "HOME",
    link: "/home",
    icon: "homeIcon",
    title: "首页",
  },
  tradeMenu,
  accountMenu,
];

export default menuList;
