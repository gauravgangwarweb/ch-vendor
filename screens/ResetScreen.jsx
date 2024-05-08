import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    Pressable,
  } from "react-native";
  import { Entypo } from "@expo/vector-icons";
  import { useState } from "react";
  import { Toast, ALERT_TYPE } from "react-native-alert-notification";
  import auth from "@react-native-firebase/auth";
  
  // Assets
  const logo = require("../assets/logo.png");
  
  const Reset = ({ navigation }) => {

  
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const sendResetMail = async () => {
        if(!email || !email.includes('@') || !email.includes('.') ) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Incorrect Email",
                textBody: "Please Enter Valid Email!",
              });
              return null
        }
        await auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Password reset email sent!",
            });
          })
          .catch((error) => {
            console.error("Reset password error:", error.status, error.message);
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: error.message || "An error occurred. Please try again.",
            });
          });
      }
  
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title2}>Password Reset</Text>
          <KeyboardAvoidingView behavior="position">
            <View style={styles.inputWrap}>
              <View style={styles.iconHolder}>
                <Entypo
                  name="email"
                  size={24}
                  color="#232323"
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.textInput}
                label="email"
                placeholder="Your Email"
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e)}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.actionsContainer}>
          <Text style={styles.signUpText}>
            Want to Login?{" "}
            <Text
              onPress={() => navigation.navigate("login")}
              style={styles.registerLink}
            >
              Login
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => sendResetMail()}
            disabled={isSubmitting}
            style={styles.loginButton}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Reset</Text>
            )}
          </TouchableOpacity>
          <Text
            onPress={() => navigation.replace("detail")}
            style={styles.version}
          >
            v 1.0.0
          </Text>
        </View>
      </View>
    );
  };
  
  export default Reset;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
    },
    content: {
      alignItems: "start",
    },
    logo: {
      marginTop: 16,
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
    },
    title2: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 32,
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
      marginTop: 32, // Adjust margin as needed
      alignItems: "center",
      gap: 16,
    },
    signUpText: {
      fontSize: 16,
      marginBottom: 8, // Adjust margin as needed
      color: "#666", // Adjust text color if needed
    },
    registerLink: {
      color: "#0CBCB7",
    },
    loginButton: {
      fontSize: 16,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: "#0CBCB7",
      color: "#fff",
      width: "100%",
      textAlign: "center",
    },
    version: {
      marginVertical: 16,
      fontSize: 12,
    },
  });
  