export default interface Transaction {
  Id: number;
  Amount: string;
  Date: Date;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: number;
  Lon: number;
  ReceiptImage?: string;
}

export interface TransactionListResponse {
  PageSize?: number;
  Page?: number;
  TotalPages?: number;
  TotalRecords?: number;
  Transactions: Transaction[];
}
