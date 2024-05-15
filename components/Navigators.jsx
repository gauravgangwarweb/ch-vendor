import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// icons
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Screens
import AddBankDetails from "../screens/AddBankDetailsScreen";
import AddTeamLeader from "../screens/AddTeamLeaderScreen";
import EarningHistory from "../screens/EarningHistoryScreen";
import EditProfile from "../screens/EditProfileScreen";
import OrdersDashboard from "../screens/OrdersDashboardScreen";
import PerformanceReport from "../screens/PerformanceReportScreen";
import PerformanceReportFileter from "../screens/PerformanceReportFilterScreen";
import ServiceDetails from "../screens/ServiceDetailsScreen";
import Dashboard from "../screens/DashBoardScreen";

//assets
const logo = require("../assets/logo.png");

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarActiveTintColor="#0CBCB7"
      tabBarInactiveTintColor="#C6C6C6"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="OrdersDashboard"
        component={OrdersDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="AddBankDetails"
        component={AddBankDetails}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bank" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="EarningHistory"
        component={EarningHistory}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: 10,
          marginTop: 20,
        }}
      >
        <Feather name="menu" size={24} color="#0CBCB7" />
        <Image source={logo} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardBottomNavigator"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="DashboardBottomNavigator"
        component={BottomTabNavigator}
        options={{ drawerLabel: () => null, hidden: true }}
      />
      <Drawer.Screen name="AddTeamLeader" component={AddTeamLeader} />
      <Drawer.Screen name="PerformanceReport" component={PerformanceReport} />
    </Drawer.Navigator>
  );
};
