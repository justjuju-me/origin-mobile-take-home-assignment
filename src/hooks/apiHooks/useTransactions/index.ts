import transactionApi from "../../../services/api/transactionApi";

function useTransactions() {
  const getTransactions = async (page: number, pageSize: number) => {
    const { data: result } = await transactionApi.getTransactionsList({
      page,
      pageSize,
    });
    return result.Transactions;
  };

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
