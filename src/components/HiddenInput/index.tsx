import { Text, TextInput, TextInputProps, View } from "react-native";
import S from "./styles";

export interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

function HiddenInput({ value, onChangeText, ...rest }: Props): JSX.Element {
  return (
    <TextInput
      style={S.input}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}

export default HiddenInput;
