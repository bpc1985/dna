import { render, fireEvent, wait } from "@testing-library/react";
import React from "react";
import AuthPage from "../AuthPage";
import { postLogIn } from "../../utils";

jest.mock("../../utils", () => ({
  postLogIn: jest.fn(() => ({token: 'newToken'})),
  getUrlParams: () => ({
    redirect: "/subscriptions"
  })
}));

const props = {
  location: {
    search: "login?redirect=/subscriptions"
  },
  history: {
    push: jest.fn()
  },
  userHasAuthenticated: jest.fn()
};

describe("AuthPage", () => {
  it("should render component", () => {
    const wrapper = render(<AuthPage {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should be able validate form", async () => {
    const { getByLabelText, getByTestId } = render(<AuthPage {...props} />);

    const emailInput = getByLabelText("Email");
    fireEvent.blur(emailInput);

    await wait(() => {
      expect(getByTestId("emailError")).not.toBe(null);
      expect(getByTestId("emailError")).toHaveTextContent("Email is required");
    });

    fireEvent.change(emailInput, { target: { value: "wrongEmail" } });
    await wait(() => {
      expect(getByTestId("emailError")).toHaveTextContent(
        "Email should be in right format"
      );
    });

    const passwordInput = getByLabelText("Password");
    fireEvent.blur(passwordInput);

    await wait(() => {
      expect(getByTestId("passwordError")).not.toBe(null);
      expect(getByTestId("passwordError")).toHaveTextContent(
        "Password is required"
      );
    });

    fireEvent.change(passwordInput, { target: { value: "12345" } });
    await wait(() => {
      expect(getByTestId("passwordError")).toHaveTextContent(
        "Password must be 7 characters or more"
      );
    });
  });

  it("should be able submit form", async () => {
    const { container, getByLabelText } = render(
      <AuthPage
        location={props.location}
        history={props.history}
        userHasAuthenticated={props.userHasAuthenticated}
      />
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = container.querySelector("button");

    fireEvent.change(emailInput, { target: { value: "user1@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "abcd@1234" } });
    fireEvent.click(loginButton);

    await wait(() => {
      expect(postLogIn).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenLastCalledWith("token", "newToken");
      expect(props.history.push).toHaveBeenCalled();
      expect(props.userHasAuthenticated).toHaveBeenCalled();
    });
  });
});
