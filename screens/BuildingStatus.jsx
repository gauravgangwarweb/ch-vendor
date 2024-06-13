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
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import firestore, { FieldValue } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
// assets
const logo = require("../assets/logo.png");

const BuildingStatus = () => {
    const navigation = useNavigation();
    const route = useRoute()
    const { building } = route.params

    const [reports, setReports] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [services, setServices] = useState(0)

    const totalReports = async () => {
        await firestore().collection('report').where('user.buildingId', '==', building.id).where('status', '==', true).get().then((querySnapshot) => {
            setReports(querySnapshot.docs.length)
        })
    }

    const totalCustomers = async () => {
        await firestore().collection('customers').where('buildingId', '==', building.id).get().then((querySnapshot) => {
            setCustomers(querySnapshot.docs.length)
        })
    }

    const totalServices = async () => {
        await firestore().collection('services').where('customer.buildingId', '==', building.id).get().then((querySnapshot) => {
            setServices(querySnapshot.docs.length)
        })
    }

    useEffect(() => {
        totalReports()
        totalCustomers()
        totalServices()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Feather
                            name="chevron-left"
                            size={24}
                            color="#000"
                            style={styles.menu}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <Text style={{ fontWeight: 600, fontSize: 20 }}>{building.name}</Text>
                    <View></View>
                </View>
                <ScrollView
                    style={{ width: "100%", marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ backgroundColor: '#0CBCB7', paddingVertical: 20, width: '49%', borderRadius: 20 }}>
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>CUSTOMERS</Text>
                            <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '700', textAlign: 'center' }}>{customers}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#0CBCB7', paddingVertical: 20, width: '49%', borderRadius: 20 }}>
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>REPORTS</Text>
                            <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '700', textAlign: 'center' }}>{reports}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: '2%', backgroundColor: '#0CBCB7', paddingVertical: 20, width: '100%', borderRadius: 20 }}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>SERVICES</Text>
                        <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '700', textAlign: 'center' }}>{services}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default BuildingStatus;

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
