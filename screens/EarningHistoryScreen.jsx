import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const EarningHistory = () => {
  const [historyButton, setHistoryButton] = useState("earning");
  const [earningData, setEarningData] = useState([]);
  const [withdrawnData, setWithdrawnData] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      const uid = auth().currentUser.uid;
      if (uid) {
        const doc = await firestore().collection("vendors").doc(uid).get();
        if (doc.exists) {
          setEarningData(doc.data().earningData || []);
          setWithdrawnData(doc.data().withdrawnData || []);
          const totalEarning = earningData.reduce(
            (sum, record) => sum + record.amount,
            0
          );
          setTotalEarning(totalEarning);
          const totalWithdrawn = withdrawnData.reduce(
            (sum, record) => sum + record.amount,
            0
          );
          setTotalWithdrawn(totalWithdrawn);
        }
      }
    };
    fetchdata();
  }, []);
  console.log(withdrawnData);

  const handleClick = (historytype) => {
    setHistoryButton(historytype);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Earning History</Text>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>Balance</Text>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>
              (Total {historyButton === "earning" ? "Earning" : "Withdrawn"})
            </Text>
          </View>
          <Text style={styles.balanceText}>₹ {historyButton === "earning" ? totalEarning : totalWithdrawn}/-</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleClick("earning")}
            style={{ padding: 10, borderRadius: 5 }}
          >
            <Text
              style={{
                color: historyButton === "earning" ? "#0CBCB7" : "#9F9F9F",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Earning History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleClick("withdrawn")}
            style={{ padding: 10, borderRadius: 5 }}
          >
            <Text
              style={{
                color: historyButton === "withdrawn" ? "#0CBCB7" : "#9F9F9F",
                fontWeight: 600,
                fontSize: 16,
                marginLeft: Platform.OS === "ios" ? 107 : 0,
              }}
            >
              Withdrawn History
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {historyButton === "earning" ? (
              earningData === undefined || earningData.length === 0 ? (
                <Text>No Earning History</Text>
              ) : (
                earningData.map((data, index) => (
                  <View key={index} style={styles.card}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#0CBCB7",
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#9F9F9F",
                          marginTop: 4,
                        }}
                      >
                        {data.packages} Packages
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#0CBCB7",
                      }}
                    >
                      + {data.amount}
                    </Text>
                  </View>
                ))
              )
            ) : (
              ""
            )}

            {historyButton === "withdrawn" ? (
              withdrawnData === undefined || withdrawnData.length === 0 ? (
                <Text>No Earning History</Text>
              ) : (
                withdrawnData.map((data, index) => (
                  <View
                    key={index}
                    style={[styles.card, { paddingVertical: 24 }]}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#0CBCB7",
                        }}
                      >
                        {data.time.toDate().toLocaleDateString()}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#0CBCB7",
                      }}
                    >
                      + {data.amount}
                    </Text>
                  </View>
                ))
              )
            ) : (
              ""
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default EarningHistory;

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
  balanceContainer: {
    width: "100%",
    backgroundColor: "#C1F8F6",
    padding: 20,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  balanceText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0CBCB7",
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cardsContainer: {
    width: "100%",
    marginTop: 2,
  },
  card: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
});
