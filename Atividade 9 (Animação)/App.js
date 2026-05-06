import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';

// ==================== COMPONENTE DA BARRA DE PROGRESSO ====================
const ProgressBar = ({ value = 0, height = 20, showLabel = true, animated = true }) => {
  // Animated value para largura
  const widthAnim = useRef(new Animated.Value(0)).current;
  
  // Animated value para cor
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Anima a largura baseado no valor (0-100)
    const targetValue = Math.min(Math.max(value, 0), 100);
    
    if (animated) {
      // Animação da largura
      Animated.timing(widthAnim, {
        toValue: targetValue,
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Easing easeOut
        useNativeDriver: false, // width precisa usar native driver false
      }).start();

      // Animação da cor
      Animated.timing(colorAnim, {
        toValue: targetValue,
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }).start();
    } else {
      widthAnim.setValue(targetValue);
      colorAnim.setValue(targetValue);
    }
  }, [value, animated]);

  // Interpolação de cor baseada no valor (0-100)
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#FF3B30', '#FFCC00', '#34C759'],
    // outputRange: ['red', 'yellow', 'green'] - versão simples
  });

  // Interpolação para cor do texto da label
  const labelColor = colorAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#FF3B30', '#FFCC00', '#34C759'],
  });

  // Largura da barra
  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // Formata o valor para exibição
  const formattedValue = Math.round(value);

  // Determina o status baseado no valor
  const getStatus = (val) => {
    if (val < 30) return 'Crítico';
    if (val < 70) return 'Em andamento';
    return 'Completo';
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <View style={styles.labelLeft}>
            <Text style={styles.labelText}>Progresso</Text>
            <Text style={[styles.statusText, { color: backgroundColor }]}>
              {getStatus(value)}
            </Text>
          </View>
          <Animated.Text style={[styles.percentageText, { color: labelColor }]}>
            {formattedValue}%
          </Animated.Text>
        </View>
      )}
      
      <View style={[styles.barBackground, { height }]}>
        <Animated.View 
          style={[
            styles.barFill, 
            { 
              width, 
              backgroundColor,
              height,
            }
          ]}
        >
          {showLabel && value > 15 && (
            <Animated.Text style={[styles.barText, { color: '#fff' }]}>
              {formattedValue}%
            </Animated.Text>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

// ==================== COMPONENTES ADICIONAIS ====================
const ProgressCard = ({ title, value, onValueChange }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <ProgressBar value={value} height={24} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonMinus]} 
          onPress={() => onValueChange(Math.max(0, value - 10))}
        >
          <Text style={styles.buttonText}>-10%</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.buttonPlus]} 
          onPress={() => onValueChange(Math.min(100, value + 10))}
        >
          <Text style={styles.buttonText}>+10%</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [progress1, setProgress1] = React.useState(25);
  const [progress2, setProgress2] = React.useState(50);
  const [progress3, setProgress3] = React.useState(75);
  const [autoProgress, setAutoProgress] = React.useState(0);
  const intervalRef = React.useRef(null);

  // Auto incremento para demonstração
  const startAutoProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAutoProgress(0);
    intervalRef.current = setInterval(() => {
      setAutoProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const resetAutoProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setAutoProgress(0);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📊 Barra de Progresso Animada</Text>
          <Text style={styles.subtitle}>
            Animated.timing() + Easing + Interpolação de Cores
          </Text>
        </View>

        {/* Exemplo 1: Progresso controlado */}
        <ProgressCard 
          title="🎮 Progresso Controlado"
          value={progress1}
          onValueChange={setProgress1}
        />

        {/* Exemplo 2: Progresso médio */}
        <ProgressCard 
          title="⚡ Progresso Médio"
          value={progress2}
          onValueChange={setProgress2}
        />

        {/* Exemplo 3: Progresso alto */}
        <ProgressCard 
          title="🏆 Progresso Alto"
          value={progress3}
          onValueChange={setProgress3}
        />

        {/* Exemplo 4: Auto incremento */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔄 Auto Incremento</Text>
          <ProgressBar value={autoProgress} height={28} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonPrimary]} 
              onPress={startAutoProgress}
            >
              <Text style={styles.buttonText}>Iniciar Animação</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonDanger]} 
              onPress={resetAutoProgress}
            >
              <Text style={styles.buttonText}>Resetar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exemplos de valores fixos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Exemplos de Cores por Faixa</Text>
          
          <View style={styles.exampleItem}>
            <Text style={styles.exampleLabel}>0% - Vermelho (Crítico)</Text>
            <ProgressBar value={0} height={16} showLabel={false} />
          </View>
          
          <View style={styles.exampleItem}>
            <Text style={styles.exampleLabel}>25% - Vermelho/Amarelo</Text>
            <ProgressBar value={25} height={16} showLabel={false} />
          </View>
          
          <View style={styles.exampleItem}>
            <Text style={styles.exampleLabel}>50% - Amarelo</Text>
            <ProgressBar value={50} height={16} showLabel={false} />
          </View>
          
          <View style={styles.exampleItem}>
            <Text style={styles.exampleLabel}>75% - Amarelo/Verde</Text>
            <ProgressBar value={75} height={16} showLabel={false} />
          </View>
          
          <View style={styles.exampleItem}>
            <Text style={styles.exampleLabel}>100% - Verde (Completo)</Text>
            <ProgressBar value={100} height={16} showLabel={false} />
          </View>
        </View>

        {/* Informações técnicas */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>⚙️ Configurações Técnicas</Text>
          <Text style={styles.infoText}>
            • Duração: 600ms{'\n'}
            • Easing: easeOut (cubic-bezier 0.25, 0.1, 0.25, 1){'\n'}
            • Interpolação de cor: 0%→Vermelho, 50%→Amarelo, 100%→Verde{'\n'}
            • Suave transição entre valores{'\n'}
            • Transição automática de cores
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonMinus: {
    backgroundColor: '#FF3B30',
  },
  buttonPlus: {
    backgroundColor: '#34C759',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exampleItem: {
    marginBottom: 16,
  },
  exampleLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  infoCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
});

// ==================== COMPONENTE DE BARRA DE PROGRESSO (ESTILOS) ====================
const barStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  barBackground: {
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});