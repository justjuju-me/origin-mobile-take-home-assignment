import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import InputWithLabel from "../../../components/InputWithLabel";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selfie, setSelfie] = useState("");

  const { signUp } = useAuth();
  return (
    <View>
      <InputWithLabel
        label="Name"
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder={""}
      />
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
      <InputWithLabel
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        placeholder={""}
      />
      <InputWithLabel
        label="Selfie"
        value={selfie}
        onChangeText={(value) => setSelfie(value)}
        placeholder={""}
      />

      <Button
        title="Confirm"
        onPress={() => signUp(name, email, password, selfie)}
      />
    </View>
  );
}
