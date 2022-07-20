import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

import menuList, { IMenuInfo } from "@routes/menu.config";

import styles from "./index.less";

function useMenuList(menuList: IMenuInfo[]) {
  return React.useMemo(() => {
    return menuList.map((item) => {
      if (item.link === "/home") {
        return (
          <div key={item.key} className={styles["menu-card-wrapper"]}>
            <div className={styles["menu-card-header"]}>
              <div className={styles["menu-card-icon"]} />
              <div className={styles["menu-card-title"]}>{item.title}</div>
            </div>
          </div>
        );
      }

      if (!item.children) {
        return (
          <NavLink
            key={item.key}
            className={({ isActive }) => {
              return isActive
                ? `${styles["menu-item"]} ${styles["menu-item-active"]}`
                : styles["menu-item"];
            }}
            to={item.link as string}
          >
            {item.title}
          </NavLink>
        );
      }

      return (
        <div key={item.key} className={styles["menu-card-wrapper"]}>
          <div className={styles["menu-card-header"]}>
            <div className={styles["menu-card-icon"]} />
            <div className={styles["menu-card-title"]}>{item.title}</div>
            <div className={styles["menu-card-show-icon"]}></div>
          </div>
          <div className={styles["menu-card-content"]}>
            {useMenuList(item.children)}
          </div>
        </div>
      );
    });
  }, [menuList]);
}

function NavMenu() {
  const menuNodes = useMenuList(menuList);
  return <div className={styles["menu-list"]}>{menuNodes}</div>;
}

export default NavMenu;
