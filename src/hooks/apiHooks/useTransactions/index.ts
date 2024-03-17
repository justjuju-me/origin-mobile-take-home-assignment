import transactionApi from "../../../services/api/transactionApi";
import * as Location from "expo-location";

function useTransactions() {
  const getTransactions = async (page: number, pageSize: number) => {
    const { data: result } = await transactionApi.getTransactionsList({
      page,
      pageSize,
    });
    return result.Transactions;
  };

  async function getTransaction(id: any) {
    const { data: transaciton } = await transactionApi.getTransaction(id);

    return transaciton;
  }

  async function updateCoordinates(id: any) {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const result = await transactionApi.updateTransaction(
      id,
      location.coords.latitude,
      location.coords.longitude
    );
    return result;
  }

  return {
    getTransactions,
    getTransaction,
    updateCoordinates,
  };
}

export default useTransactions;
