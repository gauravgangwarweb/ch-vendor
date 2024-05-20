import { useEffect, useState } from "react";
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
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { set } from "react-hook-form";

const AddBankDetails = () => {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [retypeAccountNumber, setRetypeAccountNumber] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBankDetails = async () => {
      const uid = auth().currentUser.uid;
      if (uid) {
        const doc = await firestore().collection("vendors").doc(uid).get();
        if (doc.exists) {
          setBankName(doc.data().bankDetails.bankName || "");
          setAccountName(doc.data().bankDetails.accountName || "");
          setAccountNumber(doc.data().bankDetails.accountNumber || "");
          setRetypeAccountNumber(doc.data().bankDetails.accountNumber || "");
        }
      }
    };

    fetchBankDetails();
  }, [])

  const handleSubmit = async () => {
    console.log(bankName, accountName, accountNumber, retypeAccountNumber);
    setUpdating(true);

    if (!bankName || !accountName || !accountNumber || !retypeAccountNumber) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "All fields are required",
      });
      setUpdating(false);
      return null;
    }
    if (accountNumber !== retypeAccountNumber) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Account number and retype account number must be the same",
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
            bankDetails: {
              bankName,
              accountName,
              accountNumber,
            },
          },
          { merge: true }
        )
        .then(() => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Bank details saved successfully!",
          });
          setUpdating(false);
        });
    } catch (error) {
      console.error("Error:", error.status, error.message);
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
          <Text style={styles.title}>Bank Details</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="bankName"
              placeholder="Bank Name"
              keyboardType="default"
              value={bankName}
              onChangeText={setBankName}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="accountName"
              placeholder="Account Name"
              keyboardType="default"
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="accountNumber"
              placeholder="Account Number"
              keyboardType="default"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="retypeAccountNumbber"
              placeholder="Retype Account Number"
              keyboardType="default"
              value={retypeAccountNumber}
              onChangeText={setRetypeAccountNumber}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>{updating ? "Updating..." : "Save Bank Details"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBankDetails;

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
  textInput: {
    fontSize: 16,
    backgroundColor: "#EFEFEF",
    color: "#333",
    height: 48,
    width: "100%",
    paddingStart: 16,
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
