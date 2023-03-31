import React from "react";
import Posts from "../components/Posts/Post";
// import WhatsUp from "../components/WhatsUp/WhatsUp";
import "./Home.css";

const Home = () => {
  return (
    <div className="container-global">
      <div className="container">
        {/* <WhatsUp /> */}
        <h3 className="publication">Publications récentes</h3>
        <Posts />
      </div>
    </div>
  );
};

export default Home;