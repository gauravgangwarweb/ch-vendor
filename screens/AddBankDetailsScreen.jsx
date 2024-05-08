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

const AddBankDetails = () => {
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
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="accountName"
              placeholder="Account Name"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="accountNumber"
              placeholder="Account Number"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              label="retypeAccountNumbber"
              placeholder="Retype Account Number"
              keyboardType="default"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Save Bank Details</Text>
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
