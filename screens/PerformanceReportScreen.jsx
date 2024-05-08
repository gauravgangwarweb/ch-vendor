import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Link, useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-gifted-charts";

const PerformanceReport = () => {
  const navigation = useNavigation();
  const barData = [
    { value: 5, label: "Jacob", frontColor: "#0CBCB7" },
    { value: 25, label: "Mark", frontColor: "#0CBCB7" },
    { value: 50, label: "Joy", frontColor: "#0CBCB7" },
    { value: 40, label: "Luis", frontColor: "#0CBCB7" },
    { value: 10, label: "Jaam", frontColor: "#0CBCB7" },
    { value: 60, label: "Hire", frontColor: "#0CBCB7" },
    { value: 100, label: "Kiti", frontColor: "#0CBCB7" },
  ];
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
          <Text style={styles.title}>Performance Report</Text>
          <Link href="/vendor/performance-report-filter">
            <FontAwesome6 name="sliders" size={24} color="black" />
          </Link>
        </View>
        <View style={styles.chartComponent}>
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={2}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </View>
    </View>
  );
};

export default PerformanceReport;

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
  chartComponent: {
    width: "100%",
    height: Dimensions.get("window").height / 2,
    marginTop: 16,
  },
});
