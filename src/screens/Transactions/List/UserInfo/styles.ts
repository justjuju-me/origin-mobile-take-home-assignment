import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  name: {
    padding: 10,
  },

  image: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});

export default styles;
