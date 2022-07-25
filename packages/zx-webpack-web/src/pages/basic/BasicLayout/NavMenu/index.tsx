import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuList, { MenuItemType, SubMenuType } from "@routes/menu.config";
import joinClassNames from "@/utils/join-classname";
import { svgIcons } from "@/assets/imgs/svg";

import styles from "./index.less";

function MenuItem(props: MenuItemType) {
  const { link, title } = props;

  const { pathname } = useLocation();
  const isActive = pathname === link;

  return (
    <Link
      className={joinClassNames(styles["menu-item"], isActive && styles["menu-item-active"])}
      to={link}
    >
      {title}
    </Link>
  );
}
function SubMenu(props: SubMenuType) {
  const { icon, link, title, children: menuItemList } = props;
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isSubMenu = Array.isArray(menuItemList) && menuItemList.length > 0;
  const menuItemNodes = useMemo(() => {
    return menuItemList?.map(item => <MenuItem {...item} key={item.key} />);
  }, [menuItemList]);
  const isActive = useMemo(() => {
    return menuItemList?.some(item => item.link === pathname) || link === pathname;
  }, [pathname]);

  const hanldeClick = () => setIsOpen(!isOpen);

  if (!isSubMenu) {
    return (
      <div
        className={joinClassNames(
          styles["sub-menu-wrapper"],
          isActive && styles["sub-menu-wrapper-active"]
        )}
      >
        <div onClick={hanldeClick}>
          <Link className={styles["sub-menu-header"]} to={link!}>
            {icon && <div className={styles["sub-menu-icon"]}>{svgIcons[icon]}</div>}
            {title}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={joinClassNames(
        styles["sub-menu-wrapper"],
        isActive && styles["sub-menu-wrapper-active"]
      )}
    >
      <div className={styles["sub-menu-header"]} onClick={hanldeClick}>
        {icon && <div className={styles["sub-menu-icon"]}>{svgIcons[icon]}</div>}
        {isSubMenu ? (
          <div className={styles["sub-menu-title"]}>{title}</div>
        ) : (
          <Link className={styles["sub-menu-title"]} to={link as string}>
            {title}
          </Link>
        )}
        <div className={styles["sub-menu-show-icon"]}>
          {isOpen ? svgIcons.upArrowIcon : svgIcons.downArrowIcon}
        </div>
      </div>
      <div
        className={joinClassNames(
          styles["sub-menu-content"],
          !isOpen && styles["sub-menu-content-hidden"]
        )}
      >
        {menuItemNodes}
      </div>
    </div>
  );
}

function NavMenu() {
  const menuNodes = React.useMemo(() => {
    return menuList.map(item => {
      return <SubMenu {...item} key={item.key} />;
    });
  }, [menuList]);
  return <div className={styles["menu-list"]}>{menuNodes}</div>;
}

export default NavMenu;
