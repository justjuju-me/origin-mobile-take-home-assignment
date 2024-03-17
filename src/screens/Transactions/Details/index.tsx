import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";
import { useRouteParams } from "../../../hooks/useRouteParams";

export default function Details() {
  const [transaction, setTransaction] = useState<Transaction>();
  const { getTransaction, updateCoordinates } = useTransactions();
  const { params } = useRouteParams<"TransactionDetails">();

  const fetchTransaction = async () => {
    if (params?.id !== undefined) {
      const transaction = await getTransaction(params.id);
      setTransaction(transaction);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function handleUpdateCoordinates() {
    const result = await updateCoordinates(transaction?.Id);
    fetchTransaction();
  }

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
      <Button
        title="Attach current location"
        onPress={() => handleUpdateCoordinates()}
      />
    </View>
  );
}
