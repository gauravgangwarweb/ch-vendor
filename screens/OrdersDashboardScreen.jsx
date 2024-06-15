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
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import firestore, { FieldValue } from "@react-native-firebase/firestore";

// assets
const logo = require("../assets/logo.png");

const OrdersDashboard = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("Ongoing");
  const [reports, setReports] = useState([]);
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await firestore().collection("report").get();
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(docsArray);
    };
    fetchReports();
  });
  // console.log(data[0].image);
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const filteredReports = reports.filter(report => 
    activeButton === "Ongoing" ? report.status === true : report.status !== true
  );

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
              activeButton === "Ongoing" && styles.activeButton,
            ]}
            onPress={() => {
              handleClick("Ongoing");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "Ongoing" && styles.activeButtonText,
              ]}
            >
              Ongoing
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              activeButton === "Completed" && styles.activeButton,
            ]}
            onPress={() => {
              handleClick("Completed");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "Completed" && styles.activeButtonText,
              ]}
            >
              Completed
            </Text>
          </Pressable>
        </View>
        {/* <View style={styles.dateContainer}>
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
        )} */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
        >
          {reports ? (
            filteredReports.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("report-screen", { report: item })
                }
              >
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                      {item.description}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#0CBCB7",
                      }}
                    >
                      {item.date.toDate().toDateString()}
                    </Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                      source={{ uri: item.image }}
                    />
                    <View>
                      <View style={{ flexDirection: "row", marginBottom: 2 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#0CBCB7",
                            marginRight: 2,
                          }}
                        >
                          Issue :{" "}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "600" }}>
                          {item.issue}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 2 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#0CBCB7",
                            marginRight: 2,
                          }}
                        >
                          Remarks :{" "}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "600" }}>
                          {item.remarks}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ marginTop: 20, textAlign: "center" }}>
              No data found
            </Text>
          )}
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
    width: "49%",
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
    paddingVertical: 10,
    borderWidth: 2,
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
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
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
