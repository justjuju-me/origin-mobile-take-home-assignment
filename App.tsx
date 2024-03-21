import { useNetInfo } from "@react-native-community/netinfo";
import NavigationStack from "./src/routes";
import AuthProvider from "contexts/AuthContext";
import QueryClientComponent from "shared/apiHooks/useApi/queryClient";

export default function App() {
  const { isConnected } = useNetInfo();
  return (
    <QueryClientComponent>
      <AuthProvider>
        <NavigationStack />
      </AuthProvider>
    </QueryClientComponent>
  );
}
