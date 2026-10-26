import { Activity } from "@/models/activity.model";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  item: Activity;
};

export default function ActivityCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View>
        <Text style={styles.name}>{item.type}</Text>
        <Text style={styles.time}>Duration : {item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    marginRight: 12,
  },
  name: {
    fontSize: 10,
    fontWeight: "bold",
  },
  time: {
    color: "#666",
  },
});
