/**
 * 404 兜底页面
 */
import React from "react";
import { Empty } from "@/components";

const NotFound: React.FC = () => {
  return (
    <h1>
      not found 404
      <div>
        <Empty />
      </div>
    </h1>
  );
};

NotFound.displayName = "NotFound";

export default NotFound;
