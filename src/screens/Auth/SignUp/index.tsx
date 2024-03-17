import React, { useState } from "react";
import { Button, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../contexts/AuthContext";
import InputWithLabel from "../../../components/InputWithLabel";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selfie, setSelfie] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp } = useAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelfie(result.assets[0].uri);
    }
  };

  function validateInputs() {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    if (name === "" || email === "" || password === "" || selfie === "") {
      setErrorMessage("Please fill all the fields");
      return false;
    }
    return true;
  }

  async function handleSignUp() {
    if (validateInputs() === false) return;
    const result = await signUp(name, email, password, selfie);
    if (result.error) {
      setErrorMessage(result.error);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelfie("");
    }
  }

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
      <Button title="Upload a selfie" onPress={pickImage} />
      {selfie && (
        <Image
          source={{ uri: selfie }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      )}
      {errorMessage && <Text>{errorMessage}</Text>}
      <Button title="Confirm" onPress={() => handleSignUp()} />
    </View>
  );
}
