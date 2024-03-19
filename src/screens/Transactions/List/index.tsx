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

  const page = useRef<number>(1);
  const pageSize = 5;

  const { getTransactions } = useTransactions();
  const { transactions: data, isLoading } = getTransactions(
    page.current,
    pageSize
  );
  const [transactionsList, setTransactions] = useState<Transaction[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText === "") {
      setTransactions(data);
    } else {
      setTransactions(
        transactionsList.filter(
          (transaction) =>
            transaction.category
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    console.log("reload");
  }, [data]);

  const handleOrderClick = () => {
    const newTransactionsList = [...transactionsList];
    const orderedList = newTransactionsList.sort((a, b) =>
      a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
    );
    setTransactions(orderedList);
  };

  const handleOnRefresh = () => {
    // page.current = 1;
  };

  const handleOnEndReached = () => {
    if (transactionsList && transactionsList.length < 1) return;
    // page.current++;
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
  console.log("rerendered");
  return (
    <SafeAreaView>
      <InputWithLabel
        label="Search"
        value={searchText}
        placeholder="Search by category"
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Sign Out" onPress={() => signOut()} />
      <Button title="Order by amount" onPress={() => handleOrderClick()} />
      <FlatList
        data={transactionsList}
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
