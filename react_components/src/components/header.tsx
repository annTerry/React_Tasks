import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={(isActive) => ({
                color: isActive ? "green" : "blue",
              })}
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>

  );
}
