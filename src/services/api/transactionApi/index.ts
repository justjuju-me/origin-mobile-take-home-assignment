import { AxiosResponse } from "axios";
import Transaction from "../../../types/entities/Transaction";
import { apiGet } from "../../../services/api";

type TransactionList = {
  pageSize?: number;
  page?: number;
};

type TransactionListResponse = {
  PageSize?: number;
  Page?: number;
  TotalPages?: number;
  TotalRecords?: number;
  Transactions: Transaction[];
};

const transactionsApi = {
  getTransactionsList: ({
    pageSize = 10,
    page = 1,
  }: TransactionList): Promise<AxiosResponse<TransactionListResponse>> =>
    apiGet(`transactions?page=${page}&pageSize=${pageSize}`),
  getTransaction: (id: any): Promise<AxiosResponse<Transaction>> =>
    apiGet(`transactions/${id}`),
};

export default transactionsApi;
