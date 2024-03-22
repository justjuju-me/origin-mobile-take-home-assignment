import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import S from "./styles";

type Props = {
  name: string;
  selfie: string;
  signOut: () => void;
};

export default function UserInfo({
  name,
  selfie,
  signOut,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.imageContainer}>
        <Image source={{ uri: selfie }} style={S.image} />
        <Text style={S.name}>Welcome {name}!</Text>
      </View>
      <TouchableOpacity onPress={() => signOut()}>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
