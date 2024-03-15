import { render, screen } from "@testing-library/react-native";
import SignIn from "./index";

describe("SignIn", () => {
  render(<SignIn />);

  it("should render SignIn", () => {
    expect(screen.getByText("SignIn")).toBeDefined();
  });
});
