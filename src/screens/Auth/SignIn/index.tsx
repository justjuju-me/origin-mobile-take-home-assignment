import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigateTo } = useNavigation();
  const { signIn } = useAuth();

  return (
    <View>
      <Text>Sign In</Text>
      <Text>E-mail</Text>
      <TextInput />
      <Text>Password</Text>
      <TextInput />
      <Button title="Confirm" onPress={() => signIn(email, password)} />
      <Button title="Sign Up" onPress={() => navigateTo("SignUp")} />
    </View>
  );
}
