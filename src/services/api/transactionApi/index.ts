import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Transaction from "types/entities/Transaction";
import api, { apiGet, apiPost } from "services/api";

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
  getTransaction: async (id: number): Promise<any> => {
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
  updateCoordinates: async (
    id: number,
    lat: number,
    lon: number
  ): Promise<Transaction> => {
    await apiPost(`transactions/${id}/coordinates`, { Lat: lat, Lon: lon });
    let transaction = await AsyncStorage.getItem(`transaction${id}`);

    if (transaction === null) {
      const { data: apiTransaciton } = await apiGet(`transactions/${id}`);
      transaction = apiTransaciton;
    } else {
      transaction = JSON.parse(transaction);
    }

    const object = { ...transaction, Lat: lat, Lon: lon };

    await AsyncStorage.setItem(`transaction${id}`, JSON.stringify(object));
    return new Promise((resolve) => {
      resolve(object);
    });
  },
  uploadReceipt: async (id: number, receipt: string): Promise<any> => {
    await apiPost(`transactions/${id}/receipt`, { ReceiptImage: receipt });
    let transaction = await AsyncStorage.getItem(`transaction${id}`);
    if (!transaction) {
      const { data: apiTransaciton } = await apiGet(`transactions/${id}`);
      transaction = apiTransaciton;
    } else {
      transaction = JSON.parse(transaction);
    }

    const object = { ...transaction, ReceiptImage: receipt };
    await AsyncStorage.setItem(`transaction${id}`, JSON.stringify(object));
    return new Promise((resolve) => {
      resolve(object);
    });
  },
};

export default transactionsApi;
