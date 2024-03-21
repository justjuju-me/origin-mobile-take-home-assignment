import NavigationStack from "./src/routes";
import AuthProvider from "contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import QueryClientComponent from "shared/apiHooks/useApi/queryClient";

export default function App() {
  return (
    <QueryClientComponent>
      <AuthProvider>
        <NavigationStack />
      </AuthProvider>
    </QueryClientComponent>
  );
}
