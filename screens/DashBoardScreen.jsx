import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

// assets
const logo = require("../assets/logo.png");
const pricingBg = require("../assets/pricing-bg.png");

const Dashboard = () => {
  const navigation = useNavigation();
  const completed = true; //dummy data

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather
              name="menu"
              size={24}
              color="#0CBCB7"
              style={styles.menu}
              onPress={() => navigation.openDrawer()}
            />
            <Image source={logo} style={styles.logo} />
          </View>
          <View>
            <Pressable>
              <Feather
                name="bell"
                size={24}
                color="#0CBCB7"
                style={[
                  styles.bell,
                  Platform.OS === "ios" ? { marginLeft: 168 } : {},
                ]}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          style={{ width: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={{ fontSize: 16, fontWeight: 700 }}>
                {"Kalpvruksh Heights"}
              </Text>
              <View
                style={{
                  marginTop: 14,
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Entypo name="location-pin" size={24} color="#0CBCB7" />
                <Text
                  style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                >
                  {"Vadodara, Gujarat"}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 14,
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                {completed ? (
                  <AntDesign name="checkcircle" size={18} color="black" />
                ) : (
                  <AntDesign name="closecircle" size={18} color="black" />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: completed ? "black" : "#9F9F9F",
                  }}
                >
                  Cleaning Completed
                </Text>
              </View>
            </View>
            <View style={styles.cardfooter}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <AntDesign name="checkcircle" size={18} color="white" />
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                  >
                    {" Washroom Cleaning"}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                >
                  {"5"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <AntDesign name="checkcircle" size={18} color="white" />
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                  >
                    {" Washroom"}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                >
                  {"5"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: "100%",
    paddingTop: 20,
    borderColor: "#0CBCB7",
    borderWidth: 1,
    borderRadius: 15,
  },
  cardBody: {
    width: "100%",
    paddingHorizontal: 20,
  },
  cardfooter: {
    width: "100%",
    backgroundColor: "#0CBCB7",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 15,
  },
});
