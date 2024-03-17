import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selfie, setSelfie] = useState("");

  const { signUp } = useAuth();
  return (
    <View>
      <Text>Name</Text>
      <TextInput onChangeText={(value) => setName(value)} />
      <Text>E-mail</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Text>Confirm Password</Text>
      <TextInput />
      <Text>Selfie</Text>
      <TextInput />
      <Button
        title="Confirm"
        onPress={() => signUp(name, email, password, selfie)}
      />
    </View>
  );
}
