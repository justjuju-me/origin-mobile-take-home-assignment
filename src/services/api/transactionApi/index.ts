import { AxiosResponse } from "axios";
import Transaction from "../../../types/entities/Transaction";
import { apiGetWithParams, apiGet } from "../../../services/api";

type TransactionList = {
  perPage?: number;
  page?: number;
};

const transactionsApi = {
  getTransactionsList: ({
    perPage = 10,
    page = 1,
  }: TransactionList): Promise<AxiosResponse<Transaction[]>> =>
    apiGetWithParams("transactions", {
      per: perPage,
      page,
    }),
  getTransaction: (id: any): Promise<AxiosResponse<Transaction>> =>
    apiGet(`transactions/${id}`),
};

export default transactionsApi;
