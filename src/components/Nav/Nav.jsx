import React from "react";
import logo from "../../assets/logo.svg";

import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <img src={logo} className="nav--logo" />
      <h1 className="nav--title">Meme Template Generator</h1>
      <h2 className="nav--project">developedByHerms</h2>
    </div>
  );
};

export default Nav;
