import { useCallback, useState } from "react";
import transactionApi from "../../../services/api/transactionApi";
import Transaction from "../../../types/entities/Transaction";

function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);

  const getTransactions = useCallback(async () => {
    const { data: allTransactions } = await transactionApi.getTransactionsList({
      page,
      perPage: 15,
    });

    setTransactions((oldTransactions) => [
      ...oldTransactions,
      ...allTransactions,
    ]);

    return allTransactions;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getTransaction(id: any) {
    const { data: transaciton } = await transactionApi.getTransaction(id);

    return transaciton;
  }

  return {
    transactions,
    getTransactions,
    incrementPage,
    getTransaction,
  };
}

export default useTransactions;
