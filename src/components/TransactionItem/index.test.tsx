import { fireEvent, render, screen } from "@testing-library/react-native";
import TransactionItem from "./";
import Transaction from "shared/types/Transaction";
describe("TransactionItem", () => {
  const mockFn = jest.fn();
  const item = {
    id: 1,
    vendor: "Vendor",
    amount: 100,
    lat: 10,
    lon: 10,
    type: "income",
    category: "Category",
    date: new Date(),
  };

  beforeEach(() => {
    render(<TransactionItem item={item} handleOnPress={mockFn} />);
  });

  it("renders without error", () => {
    expect(screen.getByText("Vendor")).toBeDefined();
  });

  it("calls the mockFn when clicked", () => {
    fireEvent.press(screen.getByText("Vendor"));
    expect(mockFn).toHaveBeenCalled();
  });
});
