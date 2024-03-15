import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignUp() {
  return (
    <View>
      <Text>Sign Up</Text>
      <Text>Name</Text>
      <TextInput />
      <Text>E-mail</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Text>Confirm Password</Text>
      <TextInput />
      <Text>Selfie</Text>
      <TextInput />
      <Button title="Confirm" />
    </View>
  );
}
