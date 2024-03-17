import NavigationStack from "./src/configs/navigation";
import AuthProvider from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  );
}
