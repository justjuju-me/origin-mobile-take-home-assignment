import { render, screen } from "@testing-library/react-native";
import SignIn from ".";

describe("SignIn", () => {
  render(<SignIn />);

  it("should render SignIn", () => {
    expect(screen.getByText("SignIn")).toBeDefined();
  });
});
