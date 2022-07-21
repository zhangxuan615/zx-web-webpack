import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import menuList, { IMenuInfo } from "@routes/menu.config";
import joinClassname from "@/utils/join-classname";

import styles from "./index.less";

function MenuCard(props: {
  icon?: string;
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { icon, title, children } = props;

  const hanldeClick = () => setIsOpen(!isOpen);

  return (
    <div className={styles["menu-card-wrapper"]}>
      <div className={styles["menu-card-header"]} onClick={hanldeClick}>
        <div className={styles["menu-card-icon"]} />
        <div className={styles["menu-card-title"]}>{title}</div>
        <div className={styles["menu-card-show-icon"]}></div>
      </div>
      <div
        className={joinClassname(
          styles["menu-card-content"],
          !isOpen && styles["menu-card-content-hidden"]
        )}
      >
        {children}
      </div>
    </div>
  );
}
function MenuItem(props: { link: string; title: string }) {
  const { link, title } = props;

  return (
    <NavLink
      className={({ isActive }) => {
        return joinClassname(
          `${styles["menu-item"]}`,
          isActive && `${styles["menu-item-active"]}`
        );
      }}
      to={link}
    >
      {title}
    </NavLink>
  );
}

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
          <MenuItem
            key={item.key}
            link={item.link as string}
            title={item.title}
          />
        );
      }

      return (
        <MenuCard key={item.key} icon={item.icon} title={item.title}>
          {useMenuList(item.children)}
        </MenuCard>
      );
    });
  }, [menuList]);
}

function NavMenu() {
  const menuNodes = useMenuList(menuList);
  return <div className={styles["menu-list"]}>{menuNodes}</div>;
}

export default NavMenu;
