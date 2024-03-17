import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";
import { useAuth } from "../../../contexts/AuthContext";
import InputWithLabel from "../../../components/InputWithLabel";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { navigateTo } = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    const result = await signIn(email, password);
    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <View>
      <InputWithLabel
        label="E-mail"
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={""}
      />
      <InputWithLabel
        label="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={""}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
      <Button title="Confirm" onPress={() => handleSignIn()} />
      <Button title="Sign Up" onPress={() => navigateTo("SignUp")} />
    </View>
  );
}
