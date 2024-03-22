import React from "react";
import { Text, View, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useTransactions from "shared/apiHooks/useTransactions";
import { useRouteParams } from "routes/useRouteParams";
import { formatDate } from "shared/utils/date";
import ScreenView from "screens/ScreenView";
import MapView from "components/MapWithMarker";
import ReceiptImage from "components/ReceiptImage";
import { USDollar } from "shared/utils/currency";
import Button from "components/Button";
import * as Location from "expo-location";

import S from "./styles";

export default function Details() {
  const { params } = useRouteParams<"TransactionDetails">();
  const { getTransaction, setCoordinates, setReceipt } = useTransactions();
  const { transaction, status: transactionStatus } = getTransaction(params.id);

  const {
    update: updateCoordinates,
    isError: coordinateIsError,
    isPending: coordinateIsPending,
    isSuccess: coordinateIsSuccess,
  } = setCoordinates();

  const {
    update: uploadReceipt,
    isError: receiptIsError,
    isPending: receiptIsPending,
    isSuccess: receiptIsSuccess,
  } = setReceipt();

  async function handleUpdateCoordinates() {
    const { status: permission } =
      await Location.requestForegroundPermissionsAsync();
    if (permission !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (transaction) {
      updateCoordinates({
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

    if (!result.canceled) {
      if (transaction) {
        uploadReceipt({ id: transaction.id, receipt: result.assets[0].uri });
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
    <ScreenView>
      <ScrollView style={S.container}>
        {transactionStatus === "pending" && <Text>Loading...</Text>}
        {!transaction && transactionStatus != "pending" && (
          <Text>Transaction not found</Text>
        )}
        {transaction && (
          <>
            {renderTransactionDetails()}
            <View style={S.map}>
              <MapView latitude={transaction.lat} longitude={transaction.lon} />
              {coordinateIsPending && <Text>Loading</Text>}
              {coordinateIsError && <Text>Error uploading</Text>}
              {coordinateIsSuccess && <Text>Success!</Text>}
              <Button
                text="Attach current location"
                onPress={() => handleUpdateCoordinates()}
              />
            </View>

            <View style={S.receipt}>
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
      </ScrollView>
    </ScreenView>
  );
}
