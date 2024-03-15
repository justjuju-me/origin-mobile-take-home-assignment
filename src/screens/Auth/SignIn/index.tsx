import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";

export default function SignIn() {
  const { navigateTo } = useNavigation();
  function handleSignIn() {
    navigateTo("SignUp");
  }
  return (
    <View>
      <Text>Sign In</Text>
      <Text>E-mail</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Button title="Confirm" />
      <Button title="Sign Up" onPress={() => handleSignIn()} />
    </View>
  );
}
