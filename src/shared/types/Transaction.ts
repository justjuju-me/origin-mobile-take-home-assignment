export default interface Transaction {
  id: number;
  amount: number;
  date: Date;
  vendor: string;
  type: string;
  category: string;
  lat: number;
  lon: number;
  receiptImage?: string;
}

export interface TransactionAPIResponse {
  Id: number;
  Amount: number;
  Date: Date;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: number;
  Lon: number;
  ReceiptImage?: string;
}

export interface TransactionsListAPIResponse {
  PageSize?: number;
  Page?: number;
  TotalPages?: number;
  TotalRecords?: number;
  Transactions: TransactionAPIResponse[];
}
