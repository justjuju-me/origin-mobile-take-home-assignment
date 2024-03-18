import { RouteProp, useRoute } from "@react-navigation/native";

export function useRouteParams<T extends keyof RootStackParamList>() {
  const route = useRoute<RouteProp<RootStackParamList, T>>();

  return route;
}

export type RootStackParamList = {
  TransactionDetails: { id: number };
};
