import Transaction, {
  TransactionAPIResponse,
  TransactionsListAPIResponse,
} from "shared/types/Transaction";
import transactionApi from "../../services/api/transactionApi";
import * as Location from "expo-location";
import { useApi } from "shared/apiHooks/useApi";
import TransactionDTO from "shared/services/dtos/transactionDTO";
import TransactionsDTO from "shared/services/dtos/transactionsDTO";

function useTransactions() {
  function getTransactions(page: number, pageSize: number) {
    const { data, isLoading } = useApi<TransactionsListAPIResponse>({
      key: "transactions",
      fetchMethod: () => transactionApi.getTransactionsList({ page, pageSize }),
    });

    const transactions = data ? TransactionsDTO(data) : undefined;

    return {
      isLoading,
      transactions,
    };
  }

  function getTransaction(id: number) {
    const { data, isLoading } = useApi<TransactionAPIResponse>({
      key: "transaction",
      fetchMethod: () => transactionApi.getTransaction(id),
    });

    const transaction = data ? TransactionDTO(data) : undefined;

    return {
      isLoading,
      transaction,
    };
  }

  async function updateCoordinates(id: number) {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const result = await transactionApi.updateCoordinates(
      id,
      location.coords.latitude,
      location.coords.longitude
    );
    return result;
  }

  async function uploadReceipt(id: number, receipt: string) {
    const result = await transactionApi.uploadReceipt(id, receipt);
    return result;
  }

  return {
    getTransactions,
    getTransaction,
    updateCoordinates,
    uploadReceipt,
  };
}

export default useTransactions;
