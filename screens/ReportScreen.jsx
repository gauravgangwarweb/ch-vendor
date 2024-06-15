import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { report } = route.params;
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddRemarks = async (e) => {
    console.log(remarks);
    setLoading(true);

    if (!remarks) {
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
        .collection("report")
        .where("id", "==", report.id)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot.docs[0]);
          if (!querySnapshot.empty) {
            // Assuming 'id' is unique, there should only be one document
            const documentSnapshot = querySnapshot.docs[0];
            documentSnapshot.ref
              .update({ remarks: remarks })
              .then(() => {
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: "Remarks added successfully",
                });
                setLoading(false);
                navigation.goBack();
              });
          } else {
            // Handle case where no document matches the ID
            console.log("No document matches the provided ID.");
            setLoading(false);
          }
        });
    } catch (error) {
      console.error("Error:", error.status, error.message);
      setLoading(false);
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
          <AntDesign
            onPress={() => navigation.goBack()}
            name="left"
            size={24}
            color="black"
          />
          <Text style={styles.title}>{report.description}</Text>
          <View></View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Image
              style={{ width: 340, height: 300, borderRadius: 10 }}
              source={{ uri: report.image }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Issues :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.issue}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Remarks :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.remarks}
              </Text>
            </View>
          </View>
          <View style={[styles.card, { marginTop: 10 }]}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>User Details</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Name :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.user.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Email :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.user.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Mobile :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.user.mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Flat :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.user.flat}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#0CBCB7" }}>
                Floor :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {report.user.floor}
              </Text>
            </View>
          </View>
          {report.remarks ? (
            ""
          ) : (
            <KeyboardAvoidingView>
              <View style={[styles.card, { marginTop: 10 }]}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  Add Remark
                </Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.textInput}
                    label="bankName"
                    placeholder="Your Remark"
                    keyboardType="default"
                    value={remarks}
                    onChangeText={setRemarks}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleAddRemarks()}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>
                    {loading ? "Updating..." : "Add Remark"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReportScreen;

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
  card: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: "#0CBCB7",
    borderWidth: 1,
    borderRadius: 20,
  },
  inputWrap: {
    flexDirection: "row",
    position: "relative",
    marginTop: 16,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "#EFEFEF",
    color: "#333",
    height: 48,
    width: "100%",
    paddingStart: 16,
    borderRadius: 8,
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
});
