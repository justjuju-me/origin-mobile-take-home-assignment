import { Text, TextInput, TextInputProps, View } from "react-native";
import S from "./styles";

export interface Props extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

function InputWithLabel({
  label,
  value,
  onChangeText,
  ...rest
}: Props): JSX.Element {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={S.input}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

export default InputWithLabel;
