import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import useTransactions from "shared/apiHooks/useTransactions";
import Transaction from "shared/types/Transaction";
import { useAuth } from "contexts/AuthContext";
import { useNavigation } from "routes/useNavigation";

export default function List() {
  const { signOut } = useAuth();
  const { navigateTo } = useNavigation();
  const page = useRef(1);
  const pageSize = 30;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getTransactions } = useTransactions();

  const { data, error, isLoading, refetch } = getTransactions(
    page.current,
    pageSize
  );

  useEffect(() => {
    refetch();

    if (!data) return;
    if (page.current === 1) {
      setTransactions(data.Transactions);
    } else {
      setTransactions(data.Transactions);
    }
  }, [data, page.current]);

  const handleOnRefresh = () => {
    page.current = 1;
  };

  const handleOnEndReached = () => {
    page.current = page.current + 1;
  };

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
        refreshing={false}
        onRefresh={() => handleOnRefresh()}
        keyExtractor={(item) => item.Id.toString()}
        onEndReached={() => handleOnEndReached()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
}
