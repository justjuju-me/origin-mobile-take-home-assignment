import Transaction, {
  TransactionsListAPIResponse,
} from "shared/types/Transaction";
import transactionDTO from "./transactionDTO";

function transactionsDTO(
  transactionList: TransactionsListAPIResponse
): Transaction[] {
  const transactionsList = transactionList.Transactions.map((transaction) =>
    transactionDTO(transaction)
  );
  return transactionsList;
}

export default transactionsDTO;
