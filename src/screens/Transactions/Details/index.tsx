import React from "react";
import { Button, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "shared/apiHooks/useTransactions";
import { useRouteParams } from "routes/useRouteParams";
import { formatDate } from "utils/formatDate";
import MapView from "components/MapWithMarker";
import ReceiptImage from "components/ReceiptImage";

export default function Details() {
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
  const { params } = useRouteParams<"TransactionDetails">();
  const { transaction, isLoading } = getTransaction(params?.id);

  async function handleUpdateCoordinates() {
    if (transaction) {
      await updateCoordinates(transaction?.id);
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
      if (transaction?.id) {
        await uploadReceipt(transaction?.id, result.assets[0].uri);
      }
    }
  }

  function renderTransactionDetails() {
    if (!transaction) return;
    return (
      <>
        <Text>{transaction?.id}</Text>
        <Text>{transaction?.amount}</Text>
        <Text>{formatDate(transaction?.date?.toString())}</Text>
        <Text>{transaction?.vendor}</Text>
        <Text>{transaction?.type}</Text>
        <Text>{transaction?.category}</Text>
      </>
    );
  }

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {!transaction && !isLoading && <Text>Transaction not found</Text>}
      {transaction && (
        <>
          {renderTransactionDetails()}
          <MapView latitude={transaction.lat} longitude={transaction.lon} />
          <ReceiptImage uri={transaction?.receiptImage} />
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
    </View>
  );
}
