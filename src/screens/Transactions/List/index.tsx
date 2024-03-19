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
import { formatDate } from "utils/formatDate";
import InputWithLabel from "components/InputWithLabel";

export default function List() {
  const { signOut } = useAuth();
  const { navigateTo } = useNavigation();
  const [searchText, setSearchText] = useState<string>("");

  const { getTransactions } = useTransactions();
  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    getTransactions();
  const [transactionsList, setTransactions] = useState<Transaction[]>([]);
  const dataArr = data ? data.pages.map((page) => page).flat() : [];

  useEffect(() => {
    if (searchText === "") {
      setTransactions(dataArr);
    } else {
      setTransactions(
        transactionsList.filter(
          (transaction) =>
            transaction.vendor.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    const newTransactionsList = [...transactionsList];
    const orderedList = newTransactionsList.sort((a, b) =>
      a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
    );
    setTransactions(orderedList);
  };

  const handleOnRefresh = () => {
    console.log("refreshing");
  };

  const handleOnEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  function renderItem({ item }: { item: Transaction }) {
    return (
      <TouchableOpacity
        onPress={() => navigateTo("TransactionDetails", { id: item.id })}
      >
        <Text>{item.id}</Text>
        <Text>{item.amount}</Text>
        <Text>{formatDate(item.date.toString())}</Text>
        <Text>{item.vendor}</Text>
        <Text>{item.type}</Text>
        <Text>{item.category}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <InputWithLabel
        label="Search"
        value={searchText}
        placeholder="Search by vendor"
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Sign Out" onPress={() => signOut()} />
      <Button title="Order by amount" onPress={() => handleOrderClick()} />
      <FlatList
        data={dataArr}
        renderItem={({ item }) => renderItem({ item })}
        refreshing={isLoading}
        onRefresh={() => handleOnRefresh()}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => handleOnEndReached()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
}
