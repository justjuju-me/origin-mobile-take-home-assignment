import React from "react";
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "shared/apiHooks/useTransactions";
import { useRouteParams } from "routes/useRouteParams";
import { formatDate } from "shared/utils/date";
import MapView from "components/MapWithMarker";
import ReceiptImage from "components/ReceiptImage";
import { USDollar } from "shared/utils/currency";
import Button from "components/Button";

import S from "./styles";

export default function Details() {
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
  const { params } = useRouteParams<"TransactionDetails">();
  const { transaction, status } = getTransaction(params.id);

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
        <Text style={S.vendor}>{transaction.vendor}</Text>
        <Text style={S.aditionalInfo}>{transaction.category}</Text>
        <Text style={S.aditionalInfo}>{transaction.type}</Text>
        <Text style={S.amount}>{USDollar.format(transaction.amount)}</Text>
        <Text style={S.date}>{formatDate(transaction.date)}</Text>
      </>
    );
  }

  return (
    <View style={S.container}>
      {status === "pending" && <Text>Loading...</Text>}
      {!transaction && status != "pending" && (
        <Text>Transaction not found</Text>
      )}
      {transaction && (
        <>
          {renderTransactionDetails()}
          <View style={S.info}>
            <MapView latitude={transaction.lat} longitude={transaction.lon} />
            <Button
              text="Attach current location"
              onPress={() => handleUpdateCoordinates()}
            />
          </View>

          <View style={S.info}>
            <ReceiptImage uri={transaction?.receiptImage} />
            <Button
              text="Upload receipt"
              onPress={() => handleUploadReceipt()}
            />
          </View>
        </>
      )}
    </View>
  );
}
