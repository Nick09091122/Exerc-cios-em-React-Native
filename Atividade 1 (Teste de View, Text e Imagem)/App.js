import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Isto é um view</Text>
      </View>
      <Text>Isso é um Text</Text>
      <Image 
        source={{uri: 'https://pbs.twimg.com/media/Dw0djsAW0AE0yVh.jpg'}} 
        style={styles.imageWeb}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageWeb: {
    width: 200,  // Adicione width e height para a imagem aparecer
    height: 200,
    paddingHorizontal: 15,
    paddingVertical: 20,
  }
});