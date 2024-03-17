import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";

export default function Details() {
  const [transaction, setTransaction] = useState<Transaction>();
  const { getTransaction } = useTransactions();

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await getTransaction(1);
      setTransaction(transaction);
    };
    fetchTransaction();
  }, []);

  return (
    <View>
      <Text>Transactions</Text>
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
  );
}
