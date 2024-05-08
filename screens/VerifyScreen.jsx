import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { Zocial } from "@expo/vector-icons";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import auth from "@react-native-firebase/auth";


const Verify = ({navigation}) => {

    
    
    const handleSend = () => {
        navigation.navigate('login')
    }

        const resendMail = async() => {
            try {
                const user = auth().currentUser;
                if(!user){
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Please Login First',
                        textBody: 'User is not logged In, rediecting...',
                      });
                      navigation.navigate('login')
                    return null
                }
                const mailSend = await auth().currentUser.sendEmailVerification()
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Success',
                        textBody: 'Please check your email for verification link !',
                      });
            } catch (error) {
                console.log(error)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Failed to send email verification link !',
                  });
            }
        }

    return (
        <View style={styles.container}>
             <Zocial
                        name="email"
                        size={98}
                        color="#FFF"
                        style={styles.icon}
                      />
            <Text style={{color: '#FFF', fontSize: 28}} >Please verify your account !</Text>
            <Text style={{marginTop: 10, color: '#FFF', fontSize: 16, textAlign: 'center'}} >We've sent a verification email to your inbox. Click the link in the email to verify and then hit below to Login again.</Text>
            <TouchableOpacity onPress={() => handleSend()} style={{marginTop: 60, backgroundColor: '#FFF', paddingVertical: 10, width: '80%', alignItems: 'center', borderRadius: 5}}>
                    <Text style={{color: '#0CBCB7', fontSize: 18}} >Login</Text>
            </TouchableOpacity>
                <Text style={{color: '#FFF', fontSize: 16, marginTop: 20}} >Didn't receive the email ? Click below to resend</Text> 
                <TouchableOpacity onPress={() => resendMail()} >
                <Text style={{color: '#FFF', fontSize: 16, marginTop: 10, }} >Resend Email</Text> 
                </TouchableOpacity>
            
        </View>
    );
};

export default Verify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0CBCB7",
    },
    
});