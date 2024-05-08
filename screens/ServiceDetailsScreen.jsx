import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// assets
const floorIcon = require("../assets/floor-icon.png");

const ServiceDetails = () => {
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
          <Text style={styles.title}>Service Details</Text>
          <View></View>
        </View>
        <ScrollView showsVerticalScrollIndicator="false">
          <View style={styles.detailsCard}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>
              {"Kalpvruksh Heights"}
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
                gap: 15,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#E8E8E8",
                  padding: 10,
                }}
              >
                <Entypo name="location-pin" size={24} color="#0CBCB7" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#0CBCB7",
                    fontWeight: 600,
                    marginTop: 7,
                    marginLeft: 4,
                  }}
                >
                  {"Zanzarda Bypass"}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#E8E8E8",
                  padding: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="clock-check-outline"
                  size={24}
                  color="#0CBCB7"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#0CBCB7",
                    fontWeight: 600,
                    marginTop: 7,
                    marginLeft: 4,
                  }}
                >
                  {"12:30 PM"}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#E8E8E8",
                  padding: 10,
                }}
              >
                <Image
                  style={{ width: 18, marginLeft: 4, marginTop: 4 }}
                  source={floorIcon}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#0CBCB7",
                    fontWeight: 600,
                    marginTop: 7,
                    marginLeft: 4,
                  }}
                >
                  {"15"} Floors
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#E8E8E8",
                  padding: 10,
                }}
              >
                <MaterialIcons name="person" size={24} color="#0CBCB7" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#0CBCB7",
                    fontWeight: 600,
                    marginTop: 7,
                    marginLeft: 4,
                  }}
                >
                  {"50"} Members
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 20, fontSize: 14, fontWeight: 600 }}>
              Team Leader: {"Mr Mark"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 600, color: "#9F9F9F" }}>
                Package Price: {"5000"}/-
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 600, color: "#9F9F9F" }}>
                Total Member: {"150"}
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 10,
              }}
            >
              <View style={{ flexDirection: "column", gap: 5 }}>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <MaterialIcons name="schedule" size={22} color="#0CBCB7" />
                  <Text
                    style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                  >
                    Start Date
                  </Text>
                </View>
                <Text style={{ alignSelf: "flex-end" }}>{"20-01-2023"}</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <MaterialIcons name="schedule" size={22} color="#0CBCB7" />
                  <Text
                    style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                  >
                    End Date
                  </Text>
                </View>
                <Text style={{ alignSelf: "flex-end" }}>{"20-06-2023"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.servicesList}>
            <Text style={{ color: "#9F9F9F" }}>Service</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Octicons name="dot-fill" size={20} color="#0CBCB7" />
                <Text style={{ color: "#0CBCB7" }}> {"Change Faucet"}</Text>
              </View>
              <Text style={{ color: "#0CBCB7" }}>{"5"}</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "#9F9F9F" }}>Price Per Month</Text>
            <Text style={{ color: "#9F9F9F" }}>₹ {"5000"}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "#9F9F9F" }}>Admin Commission (5%)</Text>
            <Text style={{ color: "#9F9F9F" }}>₹ {"1000"}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "#0CBCB7", fontWeight: 700 }}>
              Total Payable Amount
            </Text>
            <Text style={{ color: "#0CBCB7", fontWeight: 700 }}>
              ₹ {"4000"}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Select Team Leader</Text>
        </TouchableOpacity>
        <Text style={styles.version}>v 1.0.0</Text>
      </View>
    </View>
  );
};

export default ServiceDetails;

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
  detailsCard: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    padding: 20,
  },
  servicesList: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
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
