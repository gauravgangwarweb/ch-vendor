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
  import {
    Ionicons,
    MaterialIcons,
  } from "@expo/vector-icons";
  
  const EditProfile = () => {
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
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Save Changes</Text>
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
  