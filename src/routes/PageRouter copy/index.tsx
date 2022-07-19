import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout, Login, NotFound } from "@/pages/basic";
import { Order, Product, Sales, TradeIndex } from "@/pages/trade";
import { AccountIndex, Authority, UserInfo } from "@/pages/account";

export default function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BasicLayout />}>
          <Route path="trade">
            <Route index element={<TradeIndex />} />
            <Route path="order" element={<Order />} />
            <Route path="product" element={<Product />} />
            <Route path="sales" element={<Sales />} />
          </Route>
          <Route path="account">
            <Route index element={<AccountIndex />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="authority" element={<Authority />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
