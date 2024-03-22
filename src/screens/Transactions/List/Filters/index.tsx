import { View, Text, Image, TouchableOpacity } from "react-native";
import S from "./styles";
import Button from "components/Button";
import InputWithLabel from "components/InputWithLabel";

type Props = {
  sortByAmount: () => void;
  sortByDate: () => void;
  searchByText: (text: string) => void;
  textValue: string;
};

export default function Sort({
  sortByAmount,
  sortByDate,
  searchByText,
  textValue,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.input}>
        <InputWithLabel
          label="Search"
          value={textValue}
          placeholder="Search"
          onChangeText={(text) => searchByText(text)}
        />
      </View>
      <View style={S.sort}>
        <Text style={S.text}>Sort by:</Text>
        <View style={S.buttons}>
          <Button text="Amount" onPress={() => sortByAmount()} />
          <Button text="Date" onPress={() => sortByDate()} />
        </View>
      </View>
    </View>
  );
}
