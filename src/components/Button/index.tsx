import React from "react";
import { Text, TouchableOpacity } from "react-native";
import S from "./styles";

type Props = {
  text: string;
  onPress: () => void;
};

function Button({ text, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity role="button" style={S.button} onPress={() => onPress()}>
      <Text style={S.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
