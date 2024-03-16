import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/Auth/SignIn";
import SignUp from "../../screens/Auth/SignUp";
import TransactionDetails from "../../screens/Transactions/Details";
import TransactionsList from "../../screens/Transactions/List";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionsList">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
        <Stack.Screen name="TransactionsList" component={TransactionsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
