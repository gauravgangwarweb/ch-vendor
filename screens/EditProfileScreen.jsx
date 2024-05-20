import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const EditProfile = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [updating, setUpdating] = useState(false);
  const user = auth().currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const uid = auth().currentUser.uid;
      if (uid) {
        const doc = await firestore().collection("vendors").doc(uid).get();
        if (doc.exists) {
          setBusinessName(doc.data().businessName || "");
          setFullName(doc.data().fullName || "");
          setMobile(doc.data().mobile || "");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async () => {
    console.log(businessName, fullName, mobile);
    setUpdating(true);
    if (!businessName || !fullName || !mobile) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "All fields are required",
      });
      setUpdating(false);
      return null;
    }
    try {
      const uid = auth().currentUser.uid;
      firestore()
        .collection("vendors")
        .doc(uid)
        .set(
          {
            id: auth().currentUser.uid,
            email: auth().currentUser.email,
            businessName,
            fullName,
            mobile,
          },
          { merge: true }
        )
        .then(() => {
          auth().currentUser.updateProfile({
            displayName: fullName,
          });
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Details updated successfully!",
          });
          navigation.replace("Main");
        });
    } catch (error) {
      console.error("Error:", error.message);
      setUpdating(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
              label="businessName"
              placeholder="Business Name"
              keyboardType="default"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
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
              label="fullName"
              placeholder="Full Name"
              keyboardType="default"
              value={fullName}
              onChangeText={setFullName}
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
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>
            {updating ? "Updating..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

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
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  inputWrap: {
    flexDirection: "row",
    position: "relative",
    marginTop: 16,
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
});
