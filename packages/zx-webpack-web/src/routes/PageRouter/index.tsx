import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import pageRoutes from "../route.config";

function RouteElements() {
  const element = useRoutes(pageRoutes);
  return element;
}
const PageRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouteElements />
    </BrowserRouter>
  );
};
PageRouter.displayName = "PageRouter";

export default PageRouter;
