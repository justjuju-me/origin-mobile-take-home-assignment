import transactionApi from "../../services/api/transactionApi";
import * as Location from "expo-location";
import TransactionDTO from "shared/services/dtos/transactionDTO";
import TransactionsDTO from "shared/services/dtos/transactionsDTO";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

function useTransactions() {
  function getTransactions() {
    const fetchTransactions = async ({ pageParam }: { pageParam: number }) => {
      const pageSize = 15;
      const { data } = await transactionApi.getTransactionsList({
        pageParam,
        pageSize,
      });
      const transactions = TransactionsDTO(data);
      return transactions;
    };

    return useInfiniteQuery({
      queryKey: ["transactions"],
      queryFn: fetchTransactions,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });
  }

  function getTransaction(id: number) {
    const { data, status } = useQuery({
      queryKey: ["transaction"],
      queryFn: () => transactionApi.getTransaction(id),
    });

    const transaction = data?.data ? TransactionDTO(data.data) : null;
    return {
      status,
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
