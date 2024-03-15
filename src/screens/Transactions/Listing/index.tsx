import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";

export default function Listing() {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    console.log("Listing screen mounted");
  });

  function handlePress() {
    console.log("Pressed");
  }

  return (
    <View>
      <Text>Transactions</Text>
      <Button title="Transaction details" onPress={() => handlePress()} />
    </View>
  );
}
