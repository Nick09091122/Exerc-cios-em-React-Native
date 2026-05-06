import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Grade3x3Simples() {
  const [cores, setCores] = useState(Array(9).fill("#DDD"));

  const coresPaleta = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#000000",
  ];

  const mudarCor = (index) => {
    const novaCor = coresPaleta[Math.floor(Math.random() * coresPaleta.length)];
    const novasCores = [...cores];
    novasCores[index] = novaCor;
    setCores(novasCores);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Grade 3x3</Text>

      <View style={styles.grade}>
        {cores.map((cor, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.celula, { backgroundColor: cor }]}
            onPress={() => mudarCor(index)}
          >
            <Text style={styles.texto}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setCores(Array(9).fill("#DDD"))}
      >
        <Text style={styles.textoBotao}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  grade: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  celula: {
    width: "33.33%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  botao: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
