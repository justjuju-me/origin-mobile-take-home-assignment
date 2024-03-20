import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";
import useTransactions from "shared/apiHooks/useTransactions";
import Transaction from "shared/types/Transaction";
import { useAuth } from "contexts/AuthContext";
import { useNavigation } from "routes/useNavigation";
import InputWithLabel from "components/InputWithLabel";
import TransactionItem from "components/TransactionItem";
import Button from "components/Button";
import { useQueryClient } from "@tanstack/react-query";

export default function List() {
  const { signOut } = useAuth();
  const { navigateTo } = useNavigation();
  const [searchText, setSearchText] = useState<string>("");
  const { getTransactions } = useTransactions();
  const {
    data,
    status,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = getTransactions();
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(
    []
  );
  const queryClient = useQueryClient();
  const allTransactions = data ? data.pages.map((page) => page).flat() : [];

  useEffect(() => {
    console.log("length", allTransactions.length);
    if (visibleTransactions.length === 0 && allTransactions.length > 0) {
      setVisibleTransactions(allTransactions);
    }
  }, [allTransactions]);

  useEffect(() => {
    if (searchText === "") {
      setVisibleTransactions(allTransactions);
    } else {
      setVisibleTransactions(
        allTransactions.filter(
          (transaction) =>
            transaction.vendor.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    const newTransactionsList = [...visibleTransactions];
    const orderedList = newTransactionsList.sort((a, b) =>
      a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
    );
    setVisibleTransactions(orderedList);
  };

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["transaction"] });
    refetch();
    setVisibleTransactions(allTransactions);
  };

  const handleOnEndReached = () => {
    if (hasNextPage && status !== "pending") {
      fetchNextPage();
      setVisibleTransactions(allTransactions);
    }
  };

  return (
    <SafeAreaView>
      <Button text="Sign Out" onPress={() => signOut()} />
      <Button text="Order by amount" onPress={() => handleOrderClick()} />
      <InputWithLabel
        label="Search"
        value={searchText}
        placeholder="Search by vendor"
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={visibleTransactions}
        renderItem={({ item }) => (
          <TransactionItem
            item={item}
            handleOnPress={() => {
              navigateTo("TransactionDetails", { id: item.id });
            }}
          />
        )}
        refreshing={isRefetching}
        onRefresh={() => handleOnRefresh()}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => handleOnEndReached()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#AAAAAA" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
