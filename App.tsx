import NavigationStack from "./src/routes";
import AuthProvider from "contexts/AuthContext";
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
