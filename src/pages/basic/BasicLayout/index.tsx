/**
 * 总体布局
 */
import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu"; 

const BasicLayout: React.FC = () => {
  return (
    <>
      <h1>basic layout</h1>
      <NavMenu />
      <Outlet />
    </>
  );
};

BasicLayout.displayName = "BasicLayout";

export default BasicLayout;
