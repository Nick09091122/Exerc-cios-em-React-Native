import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function GridPressable() {
  const [grid, setGrid] = useState(Array(9).fill("#DDD"));
  const [ultimoPress, setUltimoPress] = useState(null);

  const cores = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];

  const handlePress = (index) => {
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    const novoGrid = [...grid];
    novoGrid[index] = novaCor;
    setGrid(novoGrid);
    setUltimoPress(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.titulo}>Grid com Pressable</Text>
        <Text style={styles.subtitulo}>
          Último pressionado:{" "}
          {ultimoPress !== null ? `Botão ${ultimoPress + 1}` : "Nenhum"}
        </Text>
      </View>

      <View style={styles.grid}>
        {grid.map((cor, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={({ pressed }) => [
              styles.botaoGrid,
              { backgroundColor: cor },
              pressed && styles.botaoGridPressed,
            ]}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.numeroBotao,
                  pressed && styles.numeroBotaoPressed,
                ]}
              >
                {index + 1}
              </Text>
            )}
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => {
          setGrid(Array(9).fill("#DDD"));
          setUltimoPress(null);
        }}
        style={({ pressed }) => [
          styles.botaoReset,
          pressed && styles.botaoResetPressed,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.textoReset}>
            {pressed ? "↻ Resetando..." : "🔄 Resetar Grid"}
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  botaoGrid: {
    width: "33.33%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
  },
  botaoGridPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  numeroBotao: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  numeroBotaoPressed: {
    fontSize: 26,
  },
  botaoReset: {
    backgroundColor: "#007AFF",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoResetPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  textoReset: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
