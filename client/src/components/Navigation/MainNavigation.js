import React from "react";
import { NavLink } from "react-router-dom";
import logo from './logo.png';
import "./MainNavigation.scss";

export default function MainNavigation() {
  return (
    <header className="mainMavigation">
      <div className="logo">
        <img src={logo} alt="DNA" />
      </div>
      <nav className="items">
        <ul>
          <li>
            <NavLink to="/subscriptions">Subscriptions</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
