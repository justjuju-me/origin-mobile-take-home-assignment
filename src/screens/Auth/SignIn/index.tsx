import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Formik } from "formik";
import SignInSchema from "shared/schemas/signIn";
import ScreenView from "screens/ScreenView";
import { useNavigation } from "routes/useNavigation";
import { useAuth } from "contexts/AuthContext";
import InputWithLabel from "components/InputWithLabel";
import Button from "components/Button";
import S from "./styles";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const { navigateTo } = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn(formData: { email: string; password: string }) {
    const result = await signIn(formData.email, formData.password);
    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <ScreenView>
      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            selfie: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => handleSignIn(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={S.container}>
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
              <Button text="Confirm" onPress={handleSubmit} />
              {errorMessage && <Text>{errorMessage}</Text>}
              <Button text="Sign Up" onPress={() => navigateTo("SignUp")} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </ScreenView>
  );
}
