import React, { useEffect, useState } from "react";
import { Button, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";
import { useRouteParams } from "../../../hooks/useRouteParams";

export default function Details() {
  const [transaction, setTransaction] = useState<Transaction>();
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
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
    if (transaction?.Id) {
      await updateCoordinates(transaction?.Id);
      fetchTransaction();
    }
  }

  async function handleUploadReceipt() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (transaction?.Id) {
        await uploadReceipt(transaction?.Id, result.assets[0].uri);
        fetchTransaction();
      }
    }
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
      {transaction?.ReceiptImage && (
        <Image
          source={{ uri: transaction?.ReceiptImage }}
          style={{ width: 100, height: 100 }}
        />
      )}
      <Button
        title="Attach current location"
        onPress={() => handleUpdateCoordinates()}
      />
      <Button title="Upload receipt" onPress={() => handleUploadReceipt()} />
    </View>
  );
}
