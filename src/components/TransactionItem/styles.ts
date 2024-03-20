import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vendor: {
    fontSize: 16,
  },

  amount: {
    fontSize: 16,
    textAlign: "right",
  },

  date: {
    fontSize: 10,
    textAlign: "right",
    color: "gray",
  },

  aditionalInfo: {
    fontSize: 10,
    color: "gray",
  },
});

export default styles;
