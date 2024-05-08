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
  import { useEffect, useState } from "react";
  import { Toast, ALERT_TYPE } from "react-native-alert-notification";
  import auth from "@react-native-firebase/auth";
  
  // Assets
  const logo = require("../assets/logo.png");
  const phone = require("../assets/phone.png");
  const email = require("../assets/email.png");
  const lock = require("../assets/lock.png");
  
  const Login = ({ navigation }) => {
    useEffect(() => {
      const user = auth().currentUser;
      console.log(user);
    }, []);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async () => {
      console.log(email, password);
      setIsSubmitting(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Login successful!",
          });
          if (!user.user.emailVerified) {
            navigation.replace("verify");
            return null
          }
          if(user.user.displayName === null){
              navigation.replace("detail");
              return null
          }
          if( user.user.emailVerified && user.user.displayName != null){
              navigation.replace("customer");
              return null
          }
        })
        .catch((error) => {
          console.error("Login error:", error.status, error.message);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: error.message || "An error occurred. Please try again.",
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    };
  
  
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Welcome to,</Text>
          <Text style={styles.title2}>Login</Text>
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
            <View style={styles.inputWrap}>
              <View style={styles.iconHolder}>
                <Entypo
                  name="lock"
                  size={24}
                  color="#232323"
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.textInput}
                label="email"
                placeholder="Your Password"
                secureTextEntry
                onChangeText={(p) => setPassword(p)}
              />
            </View>
            <Text
              onPress={() => navigation.navigate("reset")}
              style={{color: "#0CBCB7", textAlign: "left", marginTop: 12, marginLeft: 8}}
            >
              Forgot Password?
            </Text>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.actionsContainer}>
          <Text style={styles.signUpText}>
            Are you new?{" "}
            <Text
              onPress={() => navigation.navigate("register")}
              style={styles.registerLink}
            >
              Register
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
            style={styles.loginButton}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Login</Text>
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
  
  export default Login;
  
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