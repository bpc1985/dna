// Add Polyfill for Babel support IE11
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./stylesheets/base.scss";

ReactDOM.render(
  <App />,
  document.getElementById("app")
);

module.hot.accept();
