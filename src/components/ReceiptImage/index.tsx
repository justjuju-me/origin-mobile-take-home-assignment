import { Text, Image, View } from "react-native";
import S from "./styles";

export interface Props {
  uri: string | undefined;
}

function ReceiptImage({ uri }: Props): JSX.Element {
  return (
    <>
      {uri === null ? (
        <Text>Receipt not available</Text>
      ) : (
        <View>
          <Text style={S.title}>Receipt</Text>
          <Image source={{ uri: uri }} style={S.image} />
        </View>
      )}
    </>
  );
}

export default ReceiptImage;
