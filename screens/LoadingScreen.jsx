import {
    View,
    Text,
    ActivityIndicator,

  } from "react-native";

  const Loading = () => {

    return (
      <View style={{flex:1,backgroundColor: "#0CBCB7", justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };
  
  export default Loading;
  
 
  