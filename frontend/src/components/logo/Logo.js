import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <Tilt className="tilt">
      <div
        style={{
          height: "150px",
          width: "150px",
          backgroundColor: "darkgreen",
        }}
      >
        <h1>React Parallax Tilt</h1>
      </div>
    </Tilt>
  );
};

export default Logo;
