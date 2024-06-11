import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Platform,
    ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import firestore, { FieldValue } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";


// assets
const user = require("../assets/user-pic.jpeg");

const AddBuilding = () => {
    const navigation = useNavigation();
    const { isLoading, error, data } = useQuery({
        queryKey: ['AddBuilding'],
        queryFn: async () => {
            const querySnapshot = await firestore().collection('buildings').get();
            const docsArray = querySnapshot.docs.map(doc => doc.data());
            return docsArray;
        },
        refetchInterval: 1000
    });

    const addBuilding = async (bid) => {
        const myId = auth()?.currentUser?.uid
        firestore().collection('buildings').doc(bid).update({
            vendorId: myId
        })

        firestore().collection('vendors').doc(auth().currentUser?.uid).update({
            buildings: FieldValue.arrayUnion(bid)
        })
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Add Building",
            textBody: "Successfully Added Building",
        });
        navigation.navigate('myBuildings')
    }


    console.log(data)
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topBar}>
                    <AntDesign
                        onPress={() => navigation.navigate('myBuildings')}
                        name="left"
                        size={24}
                        color="black"
                    />
                    <Text style={styles.title}>Add Buildings</Text>
                    <View></View>
                </View>
                {isLoading &&
                    <View style={{ height: '70%', justifyContent: 'center' }}>
                        <ActivityIndicator style={{ color: '#0CBCB7' }} />
                    </View>
                }
                {error &&
                    <View style={{ height: '70%', justifyContent: 'center' }}>
                        <Text style={{ color: '#0CBCB7', textAlign: 'center' }}>No Buildings to show!</Text>
                    </View>
                }
                <View>
                    {
                        !isLoading && !error && data &&
                        data.map((d, i) => {
                            return (
                                <View key={i} style={{ padding: 20, backgroundColor: '#f4f3f4', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, fontWeight: 600, color: '#0CBCB7' }}>{d.name}</Text>
                                        <Text>{d.city}</Text>
                                    </View>
                                    <AntDesign
                                        onPress={() => addBuilding(d.id)}
                                        name="plus"
                                        size={24}
                                        color="#0CBCB7"
                                    />
                                </View>
                            )
                        })
                    }
                </View>

            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Save</Text>
                </TouchableOpacity>
                <Text style={styles.version}>v 1.0.0</Text>
            </View>
        </View>
    );
};

export default AddBuilding;

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
    profilePicContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    editPic: {
        backgroundColor: "black",
        padding: 2,
        position: "absolute",
        bottom: 2,
        right: 145,
        borderRadius: 3,
    },
    inputWrap: {
        flexDirection: "row",
        position: "relative",
        marginTop: 28,
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
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 32,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: "600",
    },
    toggleSwitch: {
        marginLeft: Platform.OS === "ios" ? 250 : 0,
    },
    actionsContainer: {
        width: "100%",
        marginTop: 32,
        alignItems: "center",
        gap: 16,
    },
    loginButton: {
        fontSize: 16,
        paddingVertical: 12,
        borderRadius: 50,
        backgroundColor: "#0CBCB7",
        color: "#fff",
        width: "100%",
        textAlign: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    version: {
        marginVertical: 8, // Adjust margin as needed
        fontSize: 12,
    },
});
