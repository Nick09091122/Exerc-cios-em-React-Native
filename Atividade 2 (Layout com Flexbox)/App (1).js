import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.Header}></View>
    <View> 
    <button style={styles.Button}></button>  
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,

  }
});