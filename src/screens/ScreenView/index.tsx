import { View } from "react-native";
import { Dimensions } from "react-native";
import NoNetworkConnection from "components/NoNetworkConnection";
import { useNetInfo } from "@react-native-community/netinfo";

const { height: fullHeight } = Dimensions.get("window");

type Props = {
  children: JSX.Element | JSX.Element[];
};

function ScreenView({ children }: Props): JSX.Element {
  const { isConnected } = useNetInfo();
  return (
    <View
      style={{
        height: fullHeight,
        width: "100%",
        position: "relative",
      }}
    >
      {children}
      {!isConnected && <NoNetworkConnection />}
    </View>
  );
}

export default ScreenView;
