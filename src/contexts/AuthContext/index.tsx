import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authApi from "../../shared/services/api/authApi";

export interface IAuthContext {
  currentUser: object | null;
  signIn: (email: string, password: string) => any;
  signUp: (
    name: string,
    email: string,
    password: string,
    selfie: string
  ) => any;
  signOut: () => void;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  selfie: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(email: string, password: string) {
    const user = await authApi.signIn(email, password);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } else {
      return { error: "User not found or incorrect password!" };
    }
  }

  async function signUp(
    name: string,
    email: string,
    password: string,
    selfie: string
  ) {
    const user = await authApi.signUp(name, email, password, selfie);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } else {
      return { error: "User already exists!" };
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem("user");
    setCurrentUser(null);
  }

  const authObject: IAuthContext = {
    currentUser,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
