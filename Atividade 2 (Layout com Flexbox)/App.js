import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function PaginaExemplo() {
  const [contador, setContador] = useState(0);

  const handleBotaoPress = () => {
    setContador(contador + 1);
    console.log("Botão do rodapé clicado!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER FIXO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu App</Text>
        <Text style={styles.headerSubtitle}>Hmmmmm</Text>
      </View>

      {/* CONTEÚDO PRINCIPAL COM flex: 1 */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Olá!</Text>
          <Text style={styles.cardText}>
            Este é o conteúdo principal da página. Ele ocupa todo o espaço
            disponível entre o header e o rodapé.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Flex é vida</Text>
          <Text style={styles.cardText}>
            O conteúdo tem flex: 1, o que significa que ele cresce para ocupar
            todo o espaço disponível.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contador: {contador}</Text>
          <Text style={styles.cardText}>
            Clique no botão do rodapé para incrementar o contador.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ScrollView</Text>
          <Text style={styles.cardText}>
            O conteúdo está dentro de um ScrollView, permitindo rolagem se o
            conteúdo for maior que a tela.
          </Text>
        </View>
      </ScrollView>

      {/* BOTÃO DO RODAPÉ COM POSITION ABSOLUTE */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={handleBotaoPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Clique aqui</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // HEADER FIXO
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // CONTEÚDO COM flex: 1
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100, // Espaço para não esconder conteúdo atrás do botão
  },

  // CARDS DE EXEMPLO
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // BOTÃO DO RODAPÉ COM POSITION ABSOLUTE
  footerButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
