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
import { useState } from "react";

// assets
const user = require("../assets/user-pic.jpeg");

const AddTeamLeader = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
        <View style={styles.profilePicContainer}>
          <Image style={styles.profilePic} source={user} />
          <Entypo
            name="edit"
            style={styles.editPic}
            size={12}
            color="#ffffff"
          />
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
              label="name"
              placeholder="Full Name"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconHolder}>
              <MaterialIcons
                name="phone-in-talk"
                size={24}
                color="#232323"
                style={styles.icon}
              />
            </View>
            <TextInput
              style={styles.textInput}
              label="mobile"
              placeholder="Mobile Number"
              keyboardType="phone-pad"
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Team Leader</Text>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#0CBCB7" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.toggleSwitch}
            />
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Done</Text>
        </TouchableOpacity>
        <Text style={styles.version}>v 1.0.0</Text>
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
