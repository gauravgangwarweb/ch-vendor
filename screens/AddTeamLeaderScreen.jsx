import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import firestore, { FieldValue } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

// assets
const user = require("../assets/user-pic.jpeg");

const AddTeamLeader = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTeamLeader = async (name) => {
    console.log(name);
    const querySnapshot = await firestore()
      .collection("teamleaders")
      .where("name", "==", name) // Assuming 'name' is the field you want to search by
      .get();
    console.log(querySnapshot.docs);
    const docsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(docsArray);
  };

  const handleAddTeamLeader = async (data) => {
    try{
      const uid = auth().currentUser.uid;
      firestore().collection("vendors").doc(uid).set({
        teamLeaders: {
          ...data,
        }
      },
      { merge: true }
    )
    .then(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Team Leader added successfully",
      });
      navigation.navigate("Main");
    });
    } catch (error) {
      console.error("Error adding team leader: ", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Error adding team leader",
      });
    }
  }

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
          <Text style={styles.title}>Add Team Leader</Text>
          <View></View>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.inputWrap}>
            <View style={styles.iconHolder}>
              <Ionicons
                name="person"
                size={24}
                color="#232323"
                style={styles.icon}
              />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Team Leader's Name"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => fetchTeamLeader(searchTerm)}
          >
            <Text style={styles.loginButtonText}>Search</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {data.length > 0 ? (
          data.map((item) => (
            <View style={styles.teamLeaderCard}>
              <View>
                <Text key={item.mobile} style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.name}
                </Text>
                <Text
                  key={item.name}
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    marginTop: 4,
                  }}
                >
                  {item.address}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleAddTeamLeader(item)}>
                  <Text style={{color: "#FF0000", fontSize: 14, fontWeight: 500}}>Add</Text>
              </TouchableOpacity>    
            </View>
          ))
        ) : (
          <Text>No team leaders found</Text>
        )}
      </View>
    </View>
  );
};

export default AddTeamLeader;

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
  profilePicContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  editPic: {
    backgroundColor: "black",
    padding: 2,
    position: "absolute",
    bottom: 2,
    right: 145,
    borderRadius: 3,
  },
  inputWrap: {
    flexDirection: "row",
    position: "relative",
    marginTop: 28,
  },
  iconHolder: {
    position: "absolute",
    top: 0,
    left: 12,
    zIndex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    opacity: 0.7,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "#EFEFEF",
    color: "#333",
    height: 48,
    width: "100%",
    paddingStart: 48,
    borderRadius: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  toggleSwitch: {
    marginLeft: Platform.OS === "ios" ? 250 : 0,
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
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  teamLeaderCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
