import React from "react";
import { getRequest, postRequest } from "@/services";
import { Empty } from "@/components";

import styles from "./index.less";

const Order: React.FC = () => {
  const handleGetSend = () => {
    getRequest("/trade/order/getAllOrders", {
      name: "zx",
    });
  };
  const handlePostSend = () => {
    postRequest("/trade/order/getAllOrders", {
      name: "zx",
    });
  };
  return (
    <div className={styles["order-container"]}>
      <div onClick={handleGetSend}>发送get</div>
      <div onClick={handlePostSend}>发送post</div>
      <Empty />
    </div>
  );
};
Order.displayName = "Order";

export default Order;
