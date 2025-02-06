export interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: Date;
}

export interface TransactionResponse {
  status: string;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: Transaction[];
  };
}
