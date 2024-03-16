import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";

export default function List() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getTransactions } = useTransactions();

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      console.log(data);
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <View>
      <Text>Transactions</Text>
      {transactions &&
        transactions.map((transaction) => (
          <View key={transaction?.Id}>
            <Text>{transaction?.Id}</Text>
            <Text>{transaction?.Amount}</Text>
            <Text>{transaction?.Date?.toString()}</Text>
            <Text>{transaction?.Vendor}</Text>
            <Text>{transaction?.Type}</Text>
            <Text>{transaction?.Category}</Text>
            <Text>{transaction?.Lat}</Text>
            <Text>{transaction?.Lon}</Text>
            <Text>{transaction?.ReceiptImage}</Text>
          </View>
        ))}
    </View>
  );
}
