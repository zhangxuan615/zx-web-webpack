/**
 * 首页
 */
import React from "react";

const Home: React.FC = () => {
  const hanleClick = () => {
    // console.log(a);
  };
  return (
    <h1 style={{ height: "1000px" }} onClick={hanleClick}>
      home
    </h1>
  );
};

Home.displayName = "Home";

export default Home;
