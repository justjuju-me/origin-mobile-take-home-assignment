import { render, screen } from "@testing-library/react-native";
import NoNetworkConnection from "./";

describe("Button", () => {
  render(<NoNetworkConnection />);

  it("should render internet error", () => {
    expect(screen.getByText("No internet connection")).toBeDefined();
  });
});
