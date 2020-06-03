import React from "react";
import { SignUp } from "../signup";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

afterEach(cleanup);

describe("SignUp view", () => {
  test("renders button", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <SignUp />
      </MockedProvider>
    );
    expect(getByTestId("signup-button")).toHaveTextContent("Zarejestruj się");
    expect(getByTestId("signup-inputmail"));
    expect(getByTestId("signup-inputFirstName"));
    expect(getByTestId("signup-inputLastName"));
    expect(getByTestId("signup-inputPassword"));
  });
});
