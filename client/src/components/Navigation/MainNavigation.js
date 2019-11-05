import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import Logout from "./Logout";
import "./MainNavigation.scss";

export default function MainNavigation({ isAuthenticated, isAuthenticating, userHasAuthenticated }) {
  return (
    !isAuthenticating && (
      <header className="mainMavigation">
        <div className="logo">
          <img src={logo} alt="DNA" />
        </div>
        <nav className="items">
          <ul>
            {!isAuthenticated && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/subscriptions">Subscriptions</NavLink>
                </li>
                <li>
                  <NavLink to="/me">Account</NavLink>
                </li>
                <li>
                  <Logout userHasAuthenticated={userHasAuthenticated} />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    )
  );
}
