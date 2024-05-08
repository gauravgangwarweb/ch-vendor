import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";

// Screens
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Reset from "./screens/ResetScreen";
import Verify from "./screens/VerifyScreen";
import Loading from "./screens/LoadingScreen";
import AddBankDetails from "./screens/AddBankDetailsScreen";
import AddTeamLeader from "./screens/AddTeamLeaderScreen";
import EarningHistory from "./screens/EarningHistoryScreen";
import EditProfile from "./screens/EditProfileScreen";
import OrdersDashboard from "./screens/OrdersDashboardScreen";
import PerformanceReport from "./screens/PerformanceReportScreen";
import PerformanceReportFileter from "./screens/PerformanceReportFilterScreen";
import ServiceDetails from "./screens/ServiceDetailsScreen";

export default function App() {
  const queryClient = new QueryClient()
  const Stack = createNativeStackNavigator();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const isVerified = auth().currentUser?.emailVerified;
        const isDetail = auth().currentUser?.displayName != null ? true : false;
        if (!isVerified) {
          setStatus("verify");
        } else if (!isDetail) {
          setStatus("detail");
        } else {
          setStatus("customer");
        }
      } else {
        setStatus("register");
      }
    });

    return unsubscribe;
  }, []);

  if (status == "loading") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#0CBCB7" />
        <Loading />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar style="light" backgroundColor="#0CBCB7" />
      <AlertNotificationRoot theme="dark">
        <QueryClientProvider client={queryClient}>

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={status}
            screenOptions={{ headerShown: false }}
            >
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="verify" component={Verify} />
            <Stack.Screen name="reset" component={Reset} />
            <Stack.Screen name="add-bank-details" component={AddBankDetails} />
            <Stack.Screen name="add-team-leader" component={AddTeamLeader} />
            <Stack.Screen name="earning-history" component={EarningHistory} />
            <Stack.Screen name="orders-dashboard" component={OrdersDashboard} />
            <Stack.Screen name="edit-profile" component={EditProfile} />
            <Stack.Screen name="performance-report" component={PerformanceReport} />
            <Stack.Screen name="service-details" component={ServiceDetails} />
          </Stack.Navigator>
        </NavigationContainer>
        </QueryClientProvider>
      </AlertNotificationRoot>
    </SafeAreaView>
  );
}
