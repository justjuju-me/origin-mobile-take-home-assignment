import Transaction, { TransactionListResponse } from "shared/types/Transaction";
import transactionApi from "../../services/api/transactionApi";
import * as Location from "expo-location";
import { useApi } from "shared/apiHooks/useApi";

function useTransactions() {
  function getTransactions(page: number, pageSize: number) {
    const { data, error, isLoading, refetch } = useApi<TransactionListResponse>(
      {
        key: "transactions",
        fetchMethod: () =>
          transactionApi.getTransactionsList({ page, pageSize }),
      }
    );

    return {
      isLoading,
      error,
      data,
      refetch,
    };
  }

  function getTransaction(id: number) {
    const { data, error, isLoading, refetch } = useApi<Transaction>({
      key: "transaction",
      fetchMethod: () => transactionApi.getTransaction(id),
    });

    return {
      isLoading,
      error,
      data,
      refetch,
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
