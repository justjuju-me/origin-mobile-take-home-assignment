export default interface Transaction {
  Id: number;
  Amount: string;
  Date: Date;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: string;
  Lon: string;
  ReceiptImage?: string;
}
