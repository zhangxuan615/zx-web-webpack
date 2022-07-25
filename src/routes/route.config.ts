import React from "react";
import { RouteObject } from "react-router-dom";
import { lazyLoadWrapper } from "./LazyLoadWrapper";
import { NotFound } from "@/pages/basic";

/**
 * 集中式路由配置
 */
const pageRoutes: RouteObject[] = [
  {
    path: "/login",
    element: lazyLoadWrapper(() => import(/* webpackChunkName:"login" */ "../pages/basic/Login"))
  },
  {
    path: "/",
    element: lazyLoadWrapper(
      () => import(/* webpackChunkName:"basic-layout" */ "../pages/basic/BasicLayout")
    ),
    children: [
      {
        path: "home",
        element: lazyLoadWrapper(() => import(/* webpackChunkName:"home" */ "../pages/basic/Home"))
      },
      {
        path: "trade",
        children: [
          {
            index: true,
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"trade-index" */ "../pages/trade/TradeIndex")
            )
          },
          {
            path: "order",
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"trade-order" */ "../pages/trade/Order")
            )
          },
          {
            path: "product",
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"trade-product" */ "../pages/trade/Product")
            )
          },
          {
            path: "sales",
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"trade-sales" */ "../pages/trade/Sales")
            )
          }
        ]
      },
      {
        path: "account",
        children: [
          {
            index: true,
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"account-index" */ "../pages/account/AccountIndex")
            )
          },
          {
            path: "user-info",
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"account-user-info" */ "../pages/account/UserInfo")
            )
          },
          {
            path: "authority",
            element: lazyLoadWrapper(
              () => import(/* webpackChunkName:"account-authority" */ "../pages/account/Authority")
            )
          }
        ]
      },
      {
        path: "style-module",
        children: [
          {
            path: "css-preprocessor",
            children: [
              {
                path: "less",
                element: lazyLoadWrapper(
                  () =>
                    import(
                      /* webpackChunkName:"css-module-less" */ "../pages/css-module/css-preprocessor/Less"
                    )
                )
              },
              {
                path: "scss",
                element: lazyLoadWrapper(
                  () =>
                    import(
                      /* webpackChunkName:"css-module-scss" */ "../pages/css-module/css-preprocessor/Scss"
                    )
                )
              },
              {
                path: "stylus",
                element: lazyLoadWrapper(
                  () =>
                    import(
                      /* webpackChunkName:"css-module-stylus" */ "../pages/css-module/css-preprocessor/Stylus"
                    )
                )
              }
            ]
          },
          {
            path: "css-in-js",
            children: [
              {
                path: "styled-components",
                element: lazyLoadWrapper(
                  () =>
                    import(
                      /* webpackChunkName:"css-module-styled-components" */ "../pages/css-module/css-in-js/StyledComponents"
                    )
                )
              },
              {
                path: "emotion",
                element: lazyLoadWrapper(
                  () =>
                    import(
                      /* webpackChunkName:"css-module-emotion" */ "../pages/css-module/css-in-js/Emotion"
                    )
                )
              }
            ]
          }
        ]
      },
      {
        path: "*",
        element: React.createElement(NotFound)
      }
    ]
  }
];

export default pageRoutes;
