import { fireEvent, render, screen } from "@testing-library/react-native";
import Button from "./";

describe("Button", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    render(<Button text="text" onPress={mockFn} />);
  });

  it("renders without error", () => {
    expect(screen.getByText("text")).toBeDefined();
  });

  it("calls the mockFn when clicked", () => {
    fireEvent.press(screen.getByText("text"));
    expect(mockFn).toHaveBeenCalled();
  });
});
