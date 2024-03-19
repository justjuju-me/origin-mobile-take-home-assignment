import { View, Image } from "react-native";
import S from "./styles";

export interface Props {
  uri: string | undefined;
}

function ReceiptImage({ uri }: Props): JSX.Element {
  return (
    <>
      <Image source={{ uri: uri }} style={S.image} />
    </>
  );
}

export default ReceiptImage;
