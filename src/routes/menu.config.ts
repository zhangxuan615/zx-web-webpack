/**
 * 路由菜单
 */
export interface IMenuInfo {
  key: string;
  link?: string;
  icon?: string;
  title: string;
  children?: IMenuInfo[];
}
/** 交易模块 */
const tradeMenu: IMenuInfo = {
  key: "TRADE",
  link: "",
  icon: "",
  title: "交易",
  children: [
    {
      key: "TRADE_ORDER",
      link: "/trade/order",
      icon: "",
      title: "订单",
    },
    {
      key: "TRADE_PRODUCT",
      link: "/trade/product",
      icon: "",
      title: "商品",
    },
    {
      key: "TRADE_SALES",
      link: "/trade/sales",
      icon: "",
      title: "销售",
    },
  ],
};
/** 账号管理 */
const accountMenu: IMenuInfo = {
  key: "ACCOUNT",
  link: "",
  icon: "",
  title: "账号",
  children: [
    {
      key: "ACCOUNT_USER_INFO",
      link: "/account/user-info",
      icon: "",
      title: "用户信息",
    },
    {
      key: "ACCOUNT_AUTHORITY",
      link: "/account/authority",
      icon: "",
      title: "权限",
    },
  ],
};

/** 全部菜单 */
const menuList: IMenuInfo[] = [
  {
    key: "HOME",
    link: "/home",
    icon: "",
    title: "首页",
  },
  tradeMenu,
  accountMenu,
];

export default menuList;
