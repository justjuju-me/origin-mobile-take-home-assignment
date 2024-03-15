export default interface Transaction {
  id: number;
  amount: string;
  date: Date;
  vendor: string;
  type: string;
  category: string;
  lat: string;
  lon: string;
  receiptImage?: string;
}
