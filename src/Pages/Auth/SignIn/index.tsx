import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignIn() {
  return (
    <View>
      <Text>Sign In</Text>
      <Text>E-mail</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Button title="Confirm" />
    </View>
  );
}
