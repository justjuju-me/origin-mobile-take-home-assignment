import NavigationStack from "./src/routes";
import AuthProvider from "contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  );
}
