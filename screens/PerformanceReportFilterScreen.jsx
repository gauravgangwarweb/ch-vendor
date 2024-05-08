import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const PerformanceReportFilter = () => {
  const [isSelected, setSelection] = useState("highest");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="left"
            size={24}
            color="black"
          />
          <Text style={styles.title}>Performance Report Filter</Text>
          <View></View>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Highest Performance</Text>
            <Checkbox
              style={styles.checkbox}
              value={isSelected === "highest"}
              onValueChange={() => setSelection("highest")}
              color={isSelected === "highest" ? "#0CBCB7" : undefined}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Lowest Performance</Text>
            <Checkbox
              style={styles.checkbox}
              value={isSelected === "lowest"}
              onValueChange={() => setSelection("lowest")}
              color={isSelected === "lowest" ? "#0CBCB7" : undefined}
            />
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Apply Filter</Text>
        </TouchableOpacity>
        <Text style={styles.version}>v 1.0.0</Text>
      </View>
    </View>
  );
};

export default PerformanceReportFilter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
  content: {
    width: "100%",
    alignItems: "start",
  },
  topBar: {
    width: "100%",
    marginTop: 16,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    width: "100%",
    height: 48,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#C6C6C6",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 50,
    padding: 5,
  },
  actionsContainer: {
    width: "100%",
    marginTop: 32,
    alignItems: "center",
    gap: 16,
  },
  loginButton: {
    fontSize: 16,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: "#0CBCB7",
    color: "#fff",
    width: "100%",
    textAlign: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  version: {
    marginVertical: 8, // Adjust margin as needed
    fontSize: 12,
  },
});
