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

export default function List() {
  const { signOut } = useAuth();
  const { navigateTo } = useNavigation();

  const page = useRef(1);
  const pageSize = 30;

  const { getTransactions } = useTransactions();

  const { transactions, isLoading } = getTransactions(page.current, pageSize);

  const handleOnRefresh = () => {
    page.current = 1;
  };

  const handleOnEndReached = () => {
    if (transactions && transactions.length < 1) return;
    page.current++;
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
      <Button title="Sign Out" onPress={() => signOut()} />
      <FlatList
        data={transactions}
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
