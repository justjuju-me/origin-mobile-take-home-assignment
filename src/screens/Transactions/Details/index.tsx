import React, { useEffect, useState } from "react";
import { Button, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import useTransactions from "hooks/apiHooks/useTransactions";
import Transaction from "shared/types/Transaction";
import { useRouteParams } from "routes/useRouteParams";
import S from "./styles";
import { formatDate } from "../../../utils/formatDate";

export default function Details() {
  const [transaction, setTransaction] = useState<Transaction>();
  const [isLoading, setIsLoading] = useState(false);
  const { getTransaction, updateCoordinates, uploadReceipt } =
    useTransactions();
  const { params } = useRouteParams<"TransactionDetails">();

  const fetchTransaction = async () => {
    setIsLoading(true);
    if (params?.id !== undefined) {
      const transaction = await getTransaction(params.id);
      setTransaction(transaction);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function handleUpdateCoordinates() {
    setIsLoading(true);
    if (transaction?.Id) {
      await updateCoordinates(transaction?.Id);
      fetchTransaction();
    }
    setIsLoading(false);
  }

  async function handleUploadReceipt() {
    setIsLoading(true);
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
    setIsLoading(false);
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

  function renderMap() {
    if (transaction?.Lat && transaction?.Lon) {
      return (
        <View style={S.mapContainer}>
          <MapView
            style={S.map}
            region={{
              latitude: transaction?.Lat || 0,
              longitude: transaction?.Lon || 0,
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
          >
            <Marker
              key={0}
              coordinate={{
                latitude: transaction?.Lat || 0,
                longitude: transaction?.Lon || 0,
              }}
            />
          </MapView>
        </View>
      );
    }
    return;
  }

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {transaction && (
        <>
          {renderTransactionDetails()}
          {renderMap()}
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
