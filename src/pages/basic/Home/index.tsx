/**
 * 首页
 */
import React from "react";

import styles from "./index.less";

const Home: React.FC = () => {
  const hanleClick = () => {
    // console.log(a);
  };

  console.log("aaabbb");
  return (
    <h1 className={styles["home-container"]} onClick={hanleClick}>
      home11
    </h1>
  );
};

Home.displayName = "Home";

export default Home;
