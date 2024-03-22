import { fireEvent, render, screen } from "@testing-library/react-native";
import SignIn from "./";
import { renderComponent } from "config/testUtils/renders";

describe("Sign In", () => {
  const mockedNavigate = jest.fn();

  jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: mockedNavigate,
      }),
    };
  });

  beforeEach(() => {
    renderComponent(<SignIn />);
  });

  it("renders without error", () => {
    expect(screen.getByText("E-mail")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
    expect(screen.getByText("Confirm")).toBeDefined();
    expect(screen.getByText("Sign Up")).toBeDefined();
  });
});
