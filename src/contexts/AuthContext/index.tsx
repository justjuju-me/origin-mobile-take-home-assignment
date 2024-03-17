import { createContext, useContext, useState } from "react";

export interface IAuthContext {
  isSignedIn: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    selfie: string
  ) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function signIn(email: string, password: string) {
    setIsSignedIn(true);
  }

  function signUp(
    name: string,
    email: string,
    password: string,
    selfie: string
  ) {
    setIsSignedIn(true);
  }

  function signOut() {
    setIsSignedIn(false);
  }

  const authObject: IAuthContext = {
    isSignedIn,
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
