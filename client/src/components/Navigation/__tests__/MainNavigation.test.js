import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "../MainNavigation";

describe("MainNavigation", () => {
  it("should render component when user is logged in", () => {
    const props = {
      isAuthenticated: true,
      userHasAuthenticated: jest.fn()
    };
    const utils = render(
      <BrowserRouter>
        <MainNavigation {...props} />
      </BrowserRouter>
    );
    expect(utils.container).toMatchSnapshot();
  });

  it("should render component when user is not logged in", () => {
    const props = {
      isAuthenticated: false,
      userHasAuthenticated: jest.fn()
    };
    const utils = render(
      <BrowserRouter>
        <MainNavigation {...props} />
      </BrowserRouter>
    );
    expect(utils.container).toMatchSnapshot();
  });
});
