import { View, StyleSheet, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const ImageField = ({ image, onPress }) => (
  <View style={styles.imageField}>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable onPress={onPress}>
        {!image && <Feather name="upload-cloud" size={24} color="#9F9F9F" />}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 90, height: "100%", borderRadius: 8 }}
          />
        )}
      </Pressable>
    </View>
  </View>
);

export default ImageField;

const styles = StyleSheet.create({
  imageField: {
    marginTop: 16,
    width: "22%",
    height: 80,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
