import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TeamLeaderCard = ({ userPic, name, contact, buildingsNumber }) => {
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamCardDetails}>
        <Image style={styles.cardImage} source={userPic} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.detailsText}>Name: {name}</Text>
          <Text style={styles.detailsText}>Contact Number: {contact}</Text>
          <Text style={styles.detailsText}>
            Work in {buildingsNumber} buildings
          </Text>
        </View>
      </View>
      <View style={styles.cardActionsContainer}>
        <TouchableOpacity style={styles.actionButtons}>
          <Text style={styles.cardActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtons}>
          <Text style={styles.cardActionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teamCard: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    marginBottom: 16,
  },
  teamCardDetails: {
    padding: 10,
    flexDirection: "row",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  cardTextContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#9F9F9F",
  },
  cardActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButtons: {
    backgroundColor: "#0CBCB7",
    width: "47%",
    borderRadius: 5,
    paddingVertical: 10,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardActionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  }
});

export default TeamLeaderCard;
