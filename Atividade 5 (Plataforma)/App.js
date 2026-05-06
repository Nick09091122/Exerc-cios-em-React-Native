import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HeaderAdaptado() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar adaptado por OS */}
      <StatusBar
        barStyle={Platform.select({
          ios: 'dark-content',
          android: 'light-content',
        })}
        backgroundColor={Platform.select({
          ios: 'transparent',
          android: '#6200ee',
        })}
        translucent={Platform.OS === 'ios'}
      />

      {/* Header adaptado por OS */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu App</Text>
        {Platform.OS === 'android' && (
          <Text style={styles.headerSubtitle}>Android Version</Text>
        )}
        {Platform.OS === 'ios' && (
          <Text style={styles.headerSubtitle}>iOS Version</Text>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Platform: {Platform.OS}</Text>
          <Text style={styles.cardText}>
            Este header está adaptado para {Platform.OS === 'ios' ? 'iOS' : 'Android'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Diferenças:</Text>
          <Text style={styles.cardText}>
            • iOS: Centralizado, fundo branco{'\n'}
            • Android: Alinhado à esquerda, fundo colorido
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header adaptado por OS
  header: {
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center', // Centralizado no iOS
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      android: {
        backgroundColor: '#6200ee',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 20,
        alignItems: 'flex-start', // Alinhado à esquerda no Android
        elevation: 4,
      },
    }),
  },

  headerTitle: {
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
      },
      android: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
      },
    }),
  },

  headerSubtitle: {
    ...Platform.select({
      ios: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
      },
      android: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
      },
    }),
  },

  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});