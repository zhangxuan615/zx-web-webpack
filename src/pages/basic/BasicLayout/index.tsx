/**
 * 总体布局
 */
import React from "react";
import { Outlet } from "react-router-dom";

const BasicLayout: React.FC = () => {
  return (
    <>
      <h1>basic layout</h1>
      <Outlet />
    </>
  );
};

BasicLayout.displayName = "BasicLayout";

export default BasicLayout;
