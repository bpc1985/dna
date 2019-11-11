import { render } from "@testing-library/react";
import React from "react";
import ListCard from "../ListCard";

const data = [
  {
    _id: "111",
    phone_number: "111111111",
    address: "Address 1",
    dnaPackage: {
      name: "Package 1",
      description: "Description 1",
      type: "mobile"
    }
  },
  {
    _id: "222",
    phone_number: "2222222222",
    address: "Address 2",
    dnaPackage: {
      name: "Package 2",
      description: "Description 2",
      type: "boardband"
    }
  }
];

describe("ListCard", () => {
  it("should render component", () => {
    const onDetail = jest.fn();
    const { container } = render(
      <ListCard data={data} onDetail={onDetail} />
    );
    expect(container).toMatchSnapshot();
  });
});
