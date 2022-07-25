import React from "react";

import styles from "./index.styl";

const Stylus: React.FC = () => {
  return <h2 className={styles["stylus-container"]}>stylus</h2>;
};
Stylus.displayName = "Stylus";

export default Stylus;
