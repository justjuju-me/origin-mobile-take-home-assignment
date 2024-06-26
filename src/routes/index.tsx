import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "screens/Auth/SignIn";
import SignUp from "screens/Auth/SignUp";
import TransactionDetails from "screens/Transactions/Details";
import TransactionsList from "screens/Transactions/List";
import { useAuth } from "contexts/AuthContext";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const { currentUser } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          <>
            <Stack.Screen name="Transactions" component={TransactionsList} />
            <Stack.Screen name="Details" component={TransactionDetails} />
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
