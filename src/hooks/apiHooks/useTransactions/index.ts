import { useCallback, useState } from "react";
import transactionApi from "../../../services/api/transactionApi";
import Transaction from "../../../types/entities/Transaction";

function useTransactions() {
  async function getTransactions() {
    const { data: response } = await transactionApi.getTransactionsList({
      page: 1,
      pageSize: 15,
    });

    return response.Transactions;
  }

  async function getTransaction(id: any) {
    const { data: transaciton } = await transactionApi.getTransaction(id);

    return transaciton;
  }

  return {
    getTransactions,
    getTransaction,
  };
}

export default useTransactions;
