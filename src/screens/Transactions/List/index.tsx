import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";

export default function List() {
  const pageSize = 30;
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getTransactions } = useTransactions();

  const fetchTransactions = async () => {
    setIsLoading(true);
    setPage(page + 1);
    const newTransactions = await getTransactions(page, pageSize);
    setTransactions((prev) => [...prev, ...newTransactions]);
    setIsLoading(false);
  };

  const handleOnRefresh = async () => {
    setIsLoading(true);
    setPage(1);
    setTransactions([]);
    fetchTransactions();
    setIsLoading(false);
  };

  const handleOnEndReached = () => {
    if (transactions.length > 0) {
      fetchTransactions();
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.Id}</Text>
            <Text>{item?.Amount}</Text>
            <Text>{item?.Date?.toString()}</Text>
            <Text>{item?.Vendor}</Text>
            <Text>{item?.Type}</Text>
            <Text>{item?.Category}</Text>
            <Text>{item?.Lat}</Text>
            <Text>{item?.Lon}</Text>
            <Text>{item?.ReceiptImage}</Text>
          </View>
        )}
        refreshing={isLoading}
        onRefresh={() => handleOnRefresh()}
        keyExtractor={(item) => item.Id.toString()}
        onEndReached={() => handleOnEndReached()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
}
