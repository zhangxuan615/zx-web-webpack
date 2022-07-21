import { pngImgs } from "@/assets/imgs/png";
import React from "react";
import { useNavigate } from "react-router";

import styles from "./index.less";

function Header() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className={styles["header-container"]}>
      <img
        className={styles["logo-img"]}
        src={pngImgs.logoImg}
        onClick={handleLogoClick}
      />

      <div className={styles["user-info"]}>
        <img className={styles["user-avatar"]} src={pngImgs.userAvatarImg} />
        <div className={styles["user-name"]}>
          我是好同志，一棵松，像阳光一样
        </div>
      </div>
    </div>
  );
}

export default Header;
