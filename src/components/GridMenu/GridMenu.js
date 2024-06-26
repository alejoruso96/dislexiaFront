import React, { Component } from "react";
import { Link } from "react-router-dom";

import GridMenuItem from "./GridMenuItem";
import "./gridMenu.css";

export default class GridMenu extends Component {
  render() {
    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Link to="/game1" className="gmi-link">
          <GridMenuItem key="1" />
        </Link>
        <Link to="/game2" className="gmi-link ">
          <GridMenuItem key="2" />
        </Link>
        <Link to="/game4" className="gmi-link">
          <GridMenuItem key="3" />
        </Link>
        <Link to="/game5" className="gmi-link">
          <GridMenuItem key="4" />
        </Link>
        <Link to="/game6" className="gmi-link">
          <GridMenuItem key="5" />
        </Link>
        <Link to="/game7" className="gmi-link">
          <GridMenuItem key="6" />
        </Link>
      </ul>
    );
  }
}
