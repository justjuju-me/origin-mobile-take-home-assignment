import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "contexts/AuthContext";
import InputWithLabel from "components/InputWithLabel";
import Button from "components/Button";
import SignUpSchema from "shared/schemas/signUp";
import S from "./styles";
import { Formik } from "formik";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  selfie: string;
};

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const { signUp } = useAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPreview(result.assets[0].uri);
      return result.assets[0].uri;
    }
  };

  async function handleSignUp(formData: SignUpFormData) {
    const result = await signUp(
      formData.name,
      formData.email,
      formData.password,
      formData.selfie
    );
    if (result.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          selfie: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={S.container}>
            <InputWithLabel
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder={""}
            />
            {errors.name && touched.name && <Text>{errors.name}</Text>}
            <InputWithLabel
              label="E-mail"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder={""}
            />
            {errors.email && touched.email && <Text>{errors.email}</Text>}
            <InputWithLabel
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder={""}
            />
            {errors.password && touched.password && (
              <Text>{errors.password}</Text>
            )}
            <InputWithLabel
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder={""}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text>{errors.confirmPassword}</Text>
            )}
            {preview && <Image source={{ uri: preview }} style={S.selfie} />}
            <Button
              text="Take a selfie"
              onPress={async () => {
                const selfie = await pickImage();
                setFieldValue("selfie", selfie);
              }}
            />
            {errors.selfie && touched.selfie && <Text>{errors.selfie}</Text>}
            <Button text="Confirm" onPress={handleSubmit} />
            {errorMessage && <Text>{errorMessage}</Text>}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
