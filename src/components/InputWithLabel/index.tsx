import { Text, TextInput, TextInputProps, View } from "react-native";
import S from "./styles";

export interface Props extends Omit<TextInputProps, "placeholder"> {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

function InputWithLabel({
  label,
  placeholder = "",
  value,
  onChangeText,
  ...rest
}: Props): JSX.Element {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={S.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

export default InputWithLabel;
