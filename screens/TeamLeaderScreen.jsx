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

// assets
const user = require("../assets/user-pic.jpeg");

const TeamLeader = () => {
  const navigation = useNavigation();
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
            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />
            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />

            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />
            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />
            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />
            <TeamLeaderCard
              userPic={user}
              name={"Lon Mark"}
              contact={"+91 1235646878"}
              buildingsNumber={"15"}
            />
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity>
        <Link href="/vender/add-team-leader" >
          <Entypo name="plus" size={28} color="#ffffff" />
        </Link>
      </TouchableOpacity>
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
});
