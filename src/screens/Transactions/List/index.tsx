import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import useTransactions from "../../../hooks/apiHooks/useTransactions";
import Transaction from "../../../types/entities/Transaction";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "../../../hooks/useNavigation";

export default function List() {
  const { signOut } = useAuth();
  const { navigateTo } = useNavigation();
  const page = useRef(1);
  const pageSize = 30;

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getTransactions } = useTransactions();

  const fetchTransactions = async () => {
    setIsLoading(true);
    const newTransactions = await getTransactions(page.current, pageSize);
    setTransactions((prev) => [...prev, ...newTransactions]);
    page.current = page.current + 1;
    setIsLoading(false);
  };

  const handleOnRefresh = async () => {
    setIsLoading(true);
    page.current = 1;
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
    page.current = 1;
    fetchTransactions();
  }, []);

  return (
    <SafeAreaView>
      <Button title="Sign Out" onPress={() => signOut()} />
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateTo("TransactionDetails", { id: item?.Id })}
          >
            <Text>{item?.Id}</Text>
            <Text>{item?.Amount}</Text>
            <Text>{item?.Date?.toString()}</Text>
            <Text>{item?.Vendor}</Text>
            <Text>{item?.Type}</Text>
            <Text>{item?.Category}</Text>
            <Text>{item?.Lat}</Text>
            <Text>{item?.Lon}</Text>
            <Text>{item?.ReceiptImage}</Text>
          </TouchableOpacity>
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
