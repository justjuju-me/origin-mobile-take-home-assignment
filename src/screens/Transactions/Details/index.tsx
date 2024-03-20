import React from "react";
import { Text, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "shared/apiHooks/useTransactions";
import { useRouteParams } from "routes/useRouteParams";
import { formatDate } from "shared/utils/date";
import MapView from "components/MapWithMarker";
import ReceiptImage from "components/ReceiptImage";
import { USDollar } from "shared/utils/currency";
import Button from "components/Button";
import * as Location from "expo-location";

import S from "./styles";

export default function Details() {
  const { params } = useRouteParams<"TransactionDetails">();
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
  const { transaction, status: transactionStatus } = getTransaction(params.id);

  const {
    update: updateCoord,
    isError: coordinateIsError,
    isPending: coordinateIsPending,
    isSuccess: coordinateIsSuccess,
  } = updateCoordinates();

  const {
    update: uploadRec,
    isError: receiptIsError,
    isPending: receiptIsPending,
    isSuccess: receiptIsSuccess,
  } = uploadReceipt();

  async function handleUpdateCoordinates() {
    if (Platform.OS === "ios") {
      const { status: permission } =
        await Location.requestForegroundPermissionsAsync();
      if (permission !== "granted") {
        return;
      }
    }
    const location = await Location.getCurrentPositionAsync({});
    if (transaction) {
      updateCoord({
        id: transaction?.id,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    }
  }

  async function handleUploadReceipt() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log("entrou");
    if (!result.canceled) {
      if (transaction?.id) {
        uploadRec({ id: transaction.id, receipt: result.assets[0].uri });
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
      {transactionStatus === "pending" && <Text>Loading...</Text>}
      {!transaction && transactionStatus != "pending" && (
        <Text>Transaction not found</Text>
      )}
      {transaction && (
        <>
          {renderTransactionDetails()}
          <View style={S.info}>
            <MapView latitude={transaction.lat} longitude={transaction.lon} />
            {coordinateIsPending && <Text>Loading</Text>}
            {coordinateIsError && <Text>Error uploading</Text>}
            {coordinateIsSuccess && <Text>Success!</Text>}
            <Button
              text="Attach current location"
              onPress={() => handleUpdateCoordinates()}
            />
          </View>

          <View style={S.info}>
            <ReceiptImage uri={transaction?.receiptImage} />
            {receiptIsPending && <Text>Loading</Text>}
            {receiptIsError && <Text>Error uploading</Text>}
            {receiptIsSuccess && <Text>Success!</Text>}
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
