import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "routes/useNavigation";
import { useAuth } from "contexts/AuthContext";
import InputWithLabel from "components/InputWithLabel";
import Button from "components/Button";

import S from "./styles";

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
    <View style={S.container}>
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
      <Button text="Confirm" onPress={() => handleSignIn()} />
      <Button text="Sign Up" onPress={() => navigateTo("SignUp")} />
    </View>
  );
}
