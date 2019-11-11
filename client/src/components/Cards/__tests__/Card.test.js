import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Card from "../Card";

const subscription = {
  _id: "111",
  phone_number: "111111111",
  address: "Address 1",
  dnaPackage: {
    name: "Package 1",
    description: "Description 1",
    type: "mobile"
  }
};

describe("Card", () => {
  it("should render component", () => {
    const onDetail = jest.fn();
    const utils = render(<Card subscription={subscription} onDetail={onDetail} />);
    expect(utils.container).toMatchSnapshot();
    const button = utils.container.querySelector('button');
    fireEvent.click(button);
    expect(onDetail).toHaveBeenCalled();
  });
});
