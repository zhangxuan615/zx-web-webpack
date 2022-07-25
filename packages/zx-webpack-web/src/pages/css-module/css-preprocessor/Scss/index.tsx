import React from "react";

import styles from "./index.scss";

const Scss: React.FC = () => {
  return <h2 className={styles["scss-container"]}>scss</h2>;
};
Scss.displayName = "Scss";

export default Scss;
