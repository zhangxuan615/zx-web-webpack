import React from "react";
import { RouteObject } from "react-router-dom";
import { BasicLayout, Login, NotFound } from "@/pages/basic";
import { Order, Product, Sales, TradeIndex } from "@/pages/trade";
import { AccountIndex, Authority, UserInfo } from "@/pages/account";

const pageRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "trade",
        children: [
          { index: true, element: <TradeIndex /> },
          { path: "order", element: <Order /> },
          { path: "product", element: <Product /> },
          { path: "sales", element: <Sales /> },
        ],
      },
      {
        path: "account",
        children: [
          { index: true, element: <AccountIndex /> },
          { path: "user-info", element: <UserInfo /> },
          { path: "authority", element: <Authority /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default pageRoutes;
