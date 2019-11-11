import { render, fireEvent, wait } from "@testing-library/react";
import React from "react";
import DetailsPage from "../DetailsPage";

jest.mock("react-router-dom", () => ({
  useParams: () => ({sid: '111'})
}));

jest.mock("../../utils", () => {
  const data = {
    _id: "111",
    phone_number: "111111111",
    address: "Address 1",
    end_user: "Micheal Lang",
    user: {
      first_name: "Hung",
      last_name: "Ho",
      email: "user1@mail.com"
    },
    dnaPackage: {
      name: "Package 1",
      description: "Description 1",
      type: "mobile",
      price: "99",
      agreement: "monthly"
    }
  };

  return {
    fetchSubscriptionDetailData: () => Promise.resolve(data)
  };
});

describe("DetailsPage", () => {
  it("should render component", async () => {
    const wrapper = render(<DetailsPage />);
    await wait(() => {
      expect(wrapper.container).toMatchSnapshot();
    });
  });
});
