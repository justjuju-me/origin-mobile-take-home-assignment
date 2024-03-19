import Transaction, { TransactionAPIResponse } from "shared/types/Transaction";

function transactionDTO(transaction: TransactionAPIResponse): Transaction {
  return {
    id: transaction.Id,
    amount: transaction.Amount,
    date: transaction.Date,
    vendor: transaction.Vendor,
    type: transaction.Type,
    category: transaction.Category,
    lat: transaction.Lat,
    lon: transaction.Lon,
    receiptImage: transaction.ReceiptImage,
  };
}

export default transactionDTO;
