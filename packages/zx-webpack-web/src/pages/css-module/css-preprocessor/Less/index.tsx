import React from "react";

import styles from "./index.less";

const Less: React.FC = () => {
  return <h2 className={styles["less-container"]}>less</h2>;
};
Less.displayName = "Less";

export default Less;
