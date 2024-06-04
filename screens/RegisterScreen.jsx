import { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useForm, Controller } from "react-hook-form";
import auth from "@react-native-firebase/auth";
import { Link } from "@react-navigation/native";

// Assets
const logo = require("../assets/logo.png");

const Register = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      pass: "",
      verifyPass: "",
    },
  });

  function validatePasswordMatch(value) {
    const password = watch("pass");
    if (value !== password) {
      return "Passwords do not match";
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then((user) => {
        user.user.sendEmailVerification();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "User registered successfully, Please Login...",
        });
        auth().signOut();
        navigation.navigate("login");
      })
      .catch((error) => {
        console.error("Registration error:", error.status, error.message);
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
        <Text style={styles.title}>Register</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrap}>
                  <View style={styles.iconHolder}>
                    <Entypo
                      name="email"
                      size={25}
                      color="#232323"
                      style={styles.icon}
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    label="email"
                    placeholder="Your Email"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={{ color: "red" }}>Email address is required.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
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
                    label="password"
                    placeholder="Enter Password"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="pass"
            />
            {errors.pass && (
              <Text style={{ color: "red" }}>{errors.pass.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Please retype password",
                validate: validatePasswordMatch,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.lastInputWrap}>
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
                    label="verify-password"
                    placeholder="Retype Password"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="verifyPass"
            />
            {errors.verifyPass && (
              <Text style={{ color: "red" }}>{errors.verifyPass.message}</Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.signUpText}>
          Are you already registered?{" "}
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.registerLink}
          >
            Login
          </Text>
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.loginButton}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Register
            </Text>
          )}
        </TouchableOpacity>
        <Link to="/customer-query" style={styles.version}>
          v 1.0.0
        </Link>
      </View>
    </View>
  );
};

export default Register;

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
    marginBottom: 32,
  },
  inputWrap: {
    flexDirection: "row",
    position: "relative",
    marginTop: 16,
  },
  lastInputWrap: {
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
    marginVertical: 16, // Adjust margin as needed
    fontSize: 12,
  },
});