import { render, fireEvent, wait } from "@testing-library/react";
import React from "react";
import SubscriptionsPage from "../SubscriptionsPage";

const props = {
  history: {
    push: jest.fn()
  }
};

jest.mock("../../utils", () => {
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

  return {
    fetchSubscriptionsData: () => Promise.resolve(data),
    isSearchTermIncluded: () => true
  };
});

describe("SubscriptionsPage", () => {
  it("should render component", async () => {
    const wrapper = render(<SubscriptionsPage history={props.history} />);
    await wait(() => {
      expect(wrapper.container).toMatchSnapshot();
    });
  });
});
