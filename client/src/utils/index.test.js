import { getUrlParams, isSearchTermIncluded } from "./index";

describe("Util functions", () => {
  it("should parse url params", () => {
    const url = "http://www.test.com/find?a=1&b=2";
    const params = getUrlParams(url);
    expect(params).toEqual({
      a: "1",
      b: "2"
    });
  });

  it("should be able to search term", () => {
    const dnaPackage = {
      name: "Package 1",
      description: "Description 1",
      type: "mobile",
      price: "99",
      agreement: "monthly"
    };
    expect(isSearchTermIncluded(dnaPackage, "package")).toBeTruthy();
    expect(isSearchTermIncluded(dnaPackage, "mobile")).toBeTruthy();
    expect(isSearchTermIncluded(dnaPackage, "monthly")).toBeTruthy();
    expect(isSearchTermIncluded(dnaPackage, "broadband")).toBeFalsy();
  });
});
