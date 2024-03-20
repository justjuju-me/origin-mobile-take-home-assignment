import transactionApi from "../../services/api/transactionApi";
import TransactionDTO from "shared/services/dtos/transactionDTO";
import TransactionsDTO from "shared/services/dtos/transactionsDTO";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

type CoordinateProps = {
  id: number;
  lat: number;
  lon: number;
};

type UploadReceiptProps = {
  id: number;
  receipt: string;
};

function useTransactions() {
  const queryClient = useQueryClient();
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

  function updateCoordinates() {
    const {
      mutate: update,
      isPending,
      isError,
      isSuccess,
    } = useMutation({
      mutationFn: ({ id, lat, lon }: CoordinateProps) =>
        transactionApi.updateCoordinates(id, lat, lon),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transaction"] });
      },
    });

    return {
      update,
      isPending,
      isError,
      isSuccess,
    };
  }

  function uploadReceipt() {
    const {
      mutate: update,
      isError,
      isPending,
      isSuccess,
    } = useMutation({
      mutationFn: ({ id, receipt }: UploadReceiptProps) =>
        transactionApi.uploadReceipt(id, receipt),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transaction"] });
      },
    });

    return {
      update,
      isError,
      isPending,
      isSuccess,
    };
  }

  return {
    getTransactions,
    getTransaction,
    updateCoordinates,
    uploadReceipt,
  };
}

export default useTransactions;
