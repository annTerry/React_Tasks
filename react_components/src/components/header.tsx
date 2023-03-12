import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default class Header extends React.Component {

render() {
  return (
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"              
              className={(state) => state.isActive ? "header-link active-link" : "header-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={(state) => state.isActive ? "header-link active-link" : "header-link"}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>

  );
}
}
