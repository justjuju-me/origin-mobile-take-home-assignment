import React from "react";
import { Button, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "shared/apiHooks/useTransactions";
import { useRouteParams } from "routes/useRouteParams";
import { formatDate } from "utils/formatDate";
import MapView from "components/MapView";
import ReceiptImage from "src";

export default function Details() {
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
  const { params } = useRouteParams<"TransactionDetails">();
  const { data, error, isLoading, refetch } = getTransaction(params?.id);

  const transaction = data;

  async function handleUpdateCoordinates() {
    if (transaction) {
      await updateCoordinates(transaction?.Id);
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
      }
    }
  }

  function renderTransactionDetails() {
    if (!transaction) return;
    return (
      <>
        <Text>{transaction?.Id}</Text>
        <Text>{transaction?.Amount}</Text>
        <Text>{formatDate(transaction?.Date?.toString())}</Text>
        <Text>{transaction?.Vendor}</Text>
        <Text>{transaction?.Type}</Text>
        <Text>{transaction?.Category}</Text>
        <Text>{transaction?.Lat}</Text>
        <Text>{transaction?.Lon}</Text>
      </>
    );
  }

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {transaction && (
        <>
          {renderTransactionDetails()}
          <MapView latitude={transaction.Lat} longitude={transaction.Lon} />
          <ReceiptImage receipt={transaction.ReceiptImage} />
          <Button
            title="Attach current location"
            onPress={() => handleUpdateCoordinates()}
          />
          <Button
            title="Upload receipt"
            onPress={() => handleUploadReceipt()}
          />
        </>
      )}
      {!transaction && <Text>Transaction not found</Text>}
    </View>
  );
}
