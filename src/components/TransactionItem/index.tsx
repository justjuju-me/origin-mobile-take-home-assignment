import { Text, TouchableOpacity, View } from "react-native";
import Transaction from "shared/types/Transaction";
import { formatDate } from "shared/utils/date";
import { USDollar } from "shared/utils/currency";

import S from "./styles";

type Props = {
  item: Transaction;
  handleOnPress: () => void;
};

function TransactionItem({ item, handleOnPress }: Props): JSX.Element {
  return (
    <TouchableOpacity style={S.item} onPress={() => handleOnPress()}>
      <View>
        <Text style={S.vendor}>{item.vendor}</Text>
        <Text style={S.aditionalInfo}>{item.type}</Text>
        <Text style={S.aditionalInfo}>{item.category}</Text>
      </View>
      <View>
        <Text style={S.amount}>{USDollar.format(item.amount)}</Text>
        <Text style={S.date}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TransactionItem;
