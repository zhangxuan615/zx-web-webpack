/**
 * 总体布局
 */
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavMenu from "./NavMenu";

import styles from "./index.less";

const BasicLayout: React.FC = () => {
  return (
    <div className={styles["global-container"]}>
      {/* header */}
      <div className={styles["header-wrapper"]}>
        <Header />
      </div>

      {/* content */}
      <div className={styles["content-wrapper"]}>
        <div className={styles["menu-list-wrapper"]}>
          <NavMenu />
        </div>
        <div className={styles["main-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

BasicLayout.displayName = "BasicLayout";

export default BasicLayout;
