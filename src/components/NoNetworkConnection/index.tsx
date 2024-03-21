import { Text, View } from "react-native";
import S from "./styles";

function NoNetworkConnection(): JSX.Element {
  return (
    <View style={S.container}>
      <Text style={S.text}>No internet connection</Text>
    </View>
  );
}

export default NoNetworkConnection;
