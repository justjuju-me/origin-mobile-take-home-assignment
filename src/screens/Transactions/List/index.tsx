import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import useTransactions from "shared/apiHooks/useTransactions";
import Transaction from "shared/types/Transaction";
import { useAuth } from "contexts/AuthContext";
import { useNavigation } from "routes/useNavigation";
import TransactionItem from "components/TransactionItem";
import ScreenView from "screens/ScreenView";
import { useQueryClient } from "@tanstack/react-query";
import S from "./styles";
import UserInfo from "./UserInfo";
import Sort from "./Filters";
import InputWithLabel from "components/InputWithLabel";

export default function List() {
  const { signOut, currentUser } = useAuth();
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
    if (
      visibleTransactions.length === 0 &&
      allTransactions.length > 0 &&
      searchText === ""
    ) {
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
              -1 ||
            transaction.category
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1 ||
            transaction.amount.toString().indexOf(searchText) > -1 ||
            transaction.date.toString().indexOf(searchText) > -1 ||
            transaction.type.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1
        )
      );
    }
  }, [searchText]);

  const handleSortByAmountClick = () => {
    const newTransactionsList = [...visibleTransactions];
    const orderedList = newTransactionsList.sort((a, b) =>
      a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
    );
    setVisibleTransactions(orderedList);
  };

  const handleSortByDateClick = () => {
    const newTransactionsList = [...visibleTransactions];
    const orderedList = newTransactionsList.sort((a, b) =>
      a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    );
    setVisibleTransactions(orderedList);
  };

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["transaction"] });
    refetch();
    setVisibleTransactions(allTransactions);
  };

  const handleOnEndReached = () => {
    if (hasNextPage && status !== "pending" && searchText === "") {
      fetchNextPage();
      setVisibleTransactions(allTransactions);
    }
  };

  return (
    <ScreenView>
      <View style={S.container}>
        {currentUser && (
          <UserInfo
            name={currentUser.name}
            selfie={currentUser.selfie}
            signOut={() => signOut()}
          />
        )}
        <Sort
          sortByAmount={() => handleSortByAmountClick()}
          sortByDate={() => handleSortByDateClick()}
          searchByText={(text) => setSearchText(text)}
          textValue={searchText}
        />
        <FlatList
          style={S.list}
          data={visibleTransactions}
          renderItem={({ item }) => (
            <TransactionItem
              item={item}
              handleOnPress={() => {
                navigateTo("Details", { id: item.id });
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
      </View>
    </ScreenView>
  );
}
