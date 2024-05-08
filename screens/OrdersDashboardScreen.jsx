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
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

// assets
const logo = require("../assets/logo.png");
const pricingBg = require("../assets/pricing-bg.png");

const OrdersDashboard = () => {
  const [activeButtomn, setActiveButton] = useState("New");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleClick = (button) => {
    setActiveButton(button);
  };

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
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              activeButtomn === "New" && styles.activeButton,
            ]}
            onPress={() => {
              handleClick("New");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtomn === "New" && styles.activeButtonText,
              ]}
            >
              New
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              activeButtomn === "Ongoing" && styles.activeButton,
            ]}
            onPress={() => {
              handleClick("Ongoing");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtomn === "Ongoing" && styles.activeButtonText,
              ]}
            >
              Ongoing
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              activeButtomn === "Completed" && styles.activeButton,
            ]}
            onPress={() => {
              handleClick("Completed");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtomn === "Completed" && styles.activeButtonText,
              ]}
            >
              Completed
            </Text>
          </Pressable>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={{ fontSize: 16, fontWeight: 700 }}>
                {"Kalpvruksh Heights"}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 12, fontWeight: 700, color: "#0CBCB7" }}
                >
                  + Team Leader
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardBody}>
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
                <MaterialIcons name="schedule" size={24} color="#0CBCB7" />
                <Text
                  style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                >
                  Start Date {"20-01-2023"}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="schedule" size={24} color="#0CBCB7" />
                <Text
                  style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                >
                  End Date {"20-06-2023"}
                </Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>
                Total Amount: {5000} * {150} = {7.5}
              </Text>
            </View>
            <ImageBackground
              source={pricingBg}
              style={{
                position: "absolute",
                top: 75,
                right: 0,
                width: 113,
                height: 38,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: 700, color: "#ffffff" }}>
                ₹ {5000}/-
              </Text>
            </ImageBackground>
            <View style={styles.cardfooter}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                >
                  . {" Washroom Cleaning"}
                </Text>
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
                <Text
                  style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}
                >
                  . {" Washroom"}
                </Text>
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

export default OrdersDashboard;

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
  buttonsContainer: {
    width: "100%",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F2",
  },
  button: {
    borderRadius: 50,
    width: "33%",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#A8A8A8",
  },
  activeButtonText: {
    color: "#ffffff",
  },
  activeButton: {
    backgroundColor: "#0CBCB7",
  },
  dateContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  card: {
    marginTop: 20,
    width: "100%",
    position: "relative",
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "#0CBCB7",
    borderRadius: 20,
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
  },
});
