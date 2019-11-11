import { render, fireEvent, wait } from "@testing-library/react";
import React from "react";
import Logout from "../Logout";
import { postLogOut } from "../../../utils";

jest.mock('react-router-dom', () => ({
  Redirect: () => <div></div>
}));

jest.mock('../../../utils', () => ({
  postLogOut: jest.fn()
}));

describe("Logout", () => {
  it("should render component", async () => {
    const userHasAuthenticated = jest.fn();
    const utils = render(<Logout userHasAuthenticated={userHasAuthenticated} />);
    expect(utils.container).toMatchSnapshot();

    const button = utils.container.querySelector('button');
    fireEvent.click(button);
    await wait(() => {
      expect(userHasAuthenticated).toHaveBeenCalled();
      expect(postLogOut).toHaveBeenCalled();
    });
  });
});
