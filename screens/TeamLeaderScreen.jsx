import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link, useNavigation } from "@react-navigation/native";
import TeamLeaderCard from "../components/TeamLeaderCard";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useQuery } from "@tanstack/react-query";

// assets
const user = require("../assets/user-pic.jpeg");

const TeamLeader = () => {
  const navigation = useNavigation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tlsData'],
    queryFn: async () => {
      const user = auth().currentUser;
      const querySnapshot = await firestore().collection("teamleaders").where('vendorId', '==', user.uid).get();
      const docs = await querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return docs;
    }
  })
  console.log(data);
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
          <Text style={styles.title}>Team Leader</Text>
          <View></View>
        </View>
        <View style={styles.teamCards}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
          >
            {
              data?.map((item, index) => (
                <View key={index} style={styles.teamLeaderCard}>
                  <View>
                    <Text
                      key={item.mobile}
                      style={{ fontSize: 14, fontWeight: 600 }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      key={item.name}
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        marginTop: 4,
                      }}
                    >
                      {item.address}
                    </Text>
                    <Text
                      key={item.name}
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        marginTop: 4,
                      }}
                    >
                      {item.mobile}
                    </Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </View>

    </View>
  );
};

export default TeamLeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  content: {
    width: "100%",
    alignItems: "start",
  },
  topBar: {
    width: "100%",
    marginTop: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  teamCards: {
    width: "100%",
    marginTop: 2,
  },
  addButton: {
    borderRadius: 100,
    backgroundColor: "#0CBCB7",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLeaderCard: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
  },
});
