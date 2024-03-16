import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/Auth/SignIn";
import SignUp from "../../screens/Auth/SignUp";
import TransactionDetails from "../../screens/Transactions/Details";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionDetails">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
