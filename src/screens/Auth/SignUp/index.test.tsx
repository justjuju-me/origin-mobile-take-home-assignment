import { screen } from "@testing-library/react-native";
import SignUp from "./";
import { renderComponent } from "config/testUtils/renders";

describe("Sign Up", () => {
  beforeEach(() => {
    renderComponent(<SignUp />);
  });

  it("renders without error", () => {
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("E-mail")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
    expect(screen.getByText("Confirm Password")).toBeDefined();
    expect(screen.getByText("Confirm")).toBeDefined();
  });
});
