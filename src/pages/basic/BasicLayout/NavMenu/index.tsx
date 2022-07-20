import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import menuList, { IMenuInfo } from "@routes/menu.config";

import "./index.less";

function useMenuList(menuList: IMenuInfo[]) {
  return React.useMemo(() => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <div key={item.key}>
            <Link to={item.link as string}>
              <span>{item.title}</span>
            </Link>
          </div>
        );
      }

      return (
        <div key={item.key}>
          <div>{item.title}</div>
          {useMenuList(item.children)}
        </div>
      );
    });
  }, [menuList]);
}

function NavMenu() {
  const menuNodes = useMenuList(menuList);
  return <div>{menuNodes}</div>;
}

export default NavMenu;
