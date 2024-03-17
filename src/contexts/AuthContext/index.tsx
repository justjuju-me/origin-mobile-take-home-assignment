import { createContext, useContext, useState } from "react";
import authApi from "../../services/api/authApi";
export interface IAuthContext {
  currentUser: object | null;
  signIn: (email: string, password: string) => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    selfie: string
  ) => void;
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

  async function signIn(email: string, password: string) {
    const user = await authApi.signIn(email, password);
    if (user) {
      setCurrentUser(user);
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
      setCurrentUser(user);
    }
  }

  function signOut() {
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
