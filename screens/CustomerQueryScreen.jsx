import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//assets
const demoServiceImg = require("../assets/demo-service.png");

const CustomerQuery = () => {
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
          <Text style={styles.title}>Customer Query</Text>
          <View></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={{fontSize: 14, fontWeight: 700, color: "#0CBCB7"}}>1. {"Mr. Luis"}</Text>
            <Text style={{marginTop: 8, fontWeight: 600, color: "#9F9F9F"}}>- {"Plumbing Work Not Well"}</Text>
            <View style={{ width: "100%", flexDirection: "row", gap: 15, marginTop: 16}}>
              <View style={{width: "28%"}}>
                <Image source={demoServiceImg} style={{width: "100%", height: 100, borderRadius: 10}} />
              </View>
              <View style={{width: "68%", paddingVertical: 5, paddingHorizontal: 15, borderLeftWidth: 5, borderLeftColor: "#0CBCB7"}}>
                <Text style={{fontSize: 13, fontWeight: 600, color: "#9F9F9F"}}>{"Plumbing work is not done equally Water drips from the faucet"}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomerQuery;

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
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
});
