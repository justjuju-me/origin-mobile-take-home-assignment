import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/Auth/SignIn";
import SignUp from "../../screens/Auth/SignUp";
import TransactionDetails from "../../screens/Transactions/Details";
import TransactionsList from "../../screens/Transactions/List";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const NavigationStack = () => {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="TransactionsList"
              component={TransactionsList}
            />
            <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetails}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
