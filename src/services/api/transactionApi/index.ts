import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Transaction from "../../../types/entities/Transaction";
import { apiGet, apiPost } from "../../../services/api";

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
    pageSize,
    page,
  }: TransactionList): Promise<AxiosResponse<TransactionListResponse>> =>
    apiGet(`transactions?page=${page}&pageSize=${pageSize}`),
  getTransaction: async (id: string): Promise<any> => {
    const transaction = await AsyncStorage.getItem(`transaction${id}`);
    if (transaction) {
      return new Promise((resolve) => {
        resolve({
          data: JSON.parse(transaction),
          status: 200,
          statusText: "OK",
          headers: {},
          config: {
            headers: { "Content-type": "json" },
          },
          request: {},
        });
      });
    } else {
      return apiGet(`transactions/${id}`);
    }
  },
  updateTransaction: async (
    id: number,
    lat: number,
    lon: number
  ): Promise<Transaction | unknown> => {
    try {
      await apiPost(`transactions/${id}/coordinates`, { Lat: lat, Lon: lon });
      const { data: transaciton } = await apiGet(`transactions/${id}`);
      const object = { ...transaciton, Lat: lat, Lon: lon };
      await AsyncStorage.setItem(`transaction${id}`, JSON.stringify(object));
      return new Promise((resoleve) => {
        resoleve(object);
      });
    } catch (error) {
      return new Promise((resolve) => {
        resolve(error);
      });
    }
  },
};

export default transactionsApi;
function getTransactionFromLocalStorage(id: string) {
  throw new Error("Function not implemented.");
}
