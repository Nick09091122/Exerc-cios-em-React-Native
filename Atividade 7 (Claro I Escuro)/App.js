import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  useColorScheme,
  ScrollView,
} from 'react-native';

// ==================== CORES ====================
const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#007AFF',
  card: '#F5F5F5',
  border: '#E0E0E0',
};

const darkColors = {
  background: '#000000',
  text: '#FFFFFF',
  textSecondary: '#999999',
  primary: '#0A84FF',
  card: '#1C1C1E',
  border: '#38383A',
};

// ==================== CONTEXT ====================
const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ==================== PROVIDER ====================
const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    if (!manualOverride) {
      setIsDark(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, manualOverride]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setManualOverride(true);
  };

  const resetTheme = () => {
    setManualOverride(false);
    setIsDark(systemColorScheme === 'dark');
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme, resetTheme, manualOverride }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ==================== COMPONENTES TEMÁTICOS ====================
const ThemedView = ({ children, style }) => {
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.background }, style]}>{children}</View>;
};

const ThemedText = ({ children, style, bold }) => {
  const { colors } = useTheme();
  return (
    <Text 
      style={[
        { color: colors.text, fontWeight: bold ? 'bold' : 'normal' },
        style
      ]}
    >
      {children}
    </Text>
  );
};

const ThemedCard = ({ children, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

// ==================== PÁGINA PRINCIPAL ====================
const AppContent = () => {
  const { isDark, toggleTheme, resetTheme, manualOverride, colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText bold style={styles.title}>🎨 Tema Dinâmico</ThemedText>
          <ThemedText style={styles.subtitle}>
            {isDark ? '🌙 Dark Mode Ativo' : '☀️ Light Mode Ativo'}
          </ThemedText>
        </View>

        {/* Controles de Tema */}
        <ThemedCard>
          <View style={styles.controlRow}>
            <ThemedText bold>Alternar Tema</ThemedText>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
          
          {manualOverride && (
            <TouchableOpacity style={styles.resetButton} onPress={resetTheme}>
              <ThemedText style={styles.resetText}>↻ Usar Tema do Sistema</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedCard>

        {/* Cards de Exemplo */}
        <ThemedCard>
          <ThemedText bold style={styles.cardTitle}>Card 1</ThemedText>
          <ThemedText>Este componente reage automaticamente ao tema!</ThemedText>
        </ThemedCard>

        <ThemedCard>
          <ThemedText bold style={styles.cardTitle}>Card 2</ThemedText>
          <ThemedText>O tema pode ser alterado manualmente ou pelo sistema.</ThemedText>
        </ThemedCard>

        <ThemedCard>
          <ThemedText bold style={styles.cardTitle}>Card 3</ThemedText>
          <ThemedText>Todos os componentes usam o ThemeContext.</ThemedText>
        </ThemedCard>

        {/* Informações */}
        <ThemedCard>
          <ThemedText bold style={styles.infoTitle}>💡 Informações</ThemedText>
          <ThemedText>• Tema do sistema: {useColorScheme()}</ThemedText>
          <ThemedText>• Modo atual: {isDark ? 'Escuro' : 'Claro'}</ThemedText>
          <ThemedText>• Controle manual: {manualOverride ? 'Sim' : 'Não'}</ThemedText>
        </ThemedCard>
      </ScrollView>
    </SafeAreaView>
  );
};

// ==================== APP PRINCIPAL ====================
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
  },
  resetText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});