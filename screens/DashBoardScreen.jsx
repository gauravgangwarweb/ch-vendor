import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import firestore, { FieldValue } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
// assets
const logo = require("../assets/logo.png");

const Dashboard = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const querySnapshot = await firestore()
        .collection("buildings")
        .get();
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return docsArray;
    }
  })

  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather
              name="menu"
              size={24}
              color="#0CBCB7"
              style={styles.menu}
              onPress={() => navigation.openDrawer()}
            />
            <Image source={logo} style={styles.logo} />
          </View>
          <View>
            <Pressable>
              <Feather
                name="bell"
                size={24}
                color="#0CBCB7"
                style={[
                  styles.bell,
                  Platform.OS === "ios" ? { marginLeft: 168 } : {},
                ]}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          style={{ width: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {data?.length === 0 && <Text style={{ marginTop: 20, textAlign: 'center' }}>No building found</Text>}
          {
            data?.map((building, index) => {
              return (
                <View key={index} style={styles.card}>
                  <View style={styles.cardBody}>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>
                      {building.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 14,
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="location-pin" size={24} color="#0CBCB7" />
                      <Text
                        style={{ fontSize: 14, fontWeight: 600, color: "#0CBCB7" }}
                      >
                        {building.landmark + ', ' + building.city}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('buildingStatus', { building: building })} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, backgroundColor: '#0CBCB7', marginTop: 20 }}>
                    <AntDesign name="piechart" size={18} color="white" />
                    <Text
                      style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", textAlign: 'center' }}
                    >
                      {" View Status"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: "100%",
    paddingTop: 20,
    borderColor: "#0CBCB7",
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardBody: {
    width: "100%",
    paddingHorizontal: 20,
  },
  cardfooter: {
    width: "100%",
    backgroundColor: "#0CBCB7",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 15,
  },
});
