/**
 * 首页
 */
import React from "react";

const Home: React.FC = () => {
  const hanleClick = () => {
    // console.log(a);
  };

  console.log("aaabbb");
  return <h1 onClick={hanleClick}>{"home1"}</h1>;
};

Home.displayName = "Home";

export default Home;
