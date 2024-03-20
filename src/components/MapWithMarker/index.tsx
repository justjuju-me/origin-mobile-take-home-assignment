import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import S from "./styles";

export interface Props {
  latitude: number;
  longitude: number;
}

function MapWithMarker({ latitude, longitude }: Props): JSX.Element {
  return (
    <View>
      <Text style={S.title}>Location</Text>
      <MapView
        style={S.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >
        <Marker
          key={0}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  );
}

export default MapWithMarker;
