import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from 'react-native';

export default function LayoutComHooks() {
  // useWindowDimensions já reage a mudanças de orientação automaticamente
  const { width, height } = useWindowDimensions();
  const orientation = height > width ? 'portrait' : 'landscape';
  
  const cardsData = Array(10).fill().map((_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
    description: `Conteúdo adaptável à orientação ${orientation}`,
    image: i % 2 === 0 ? '🎨' : '📱',
  }));

  const numColumns = orientation === 'portrait' ? 1 : 2;
  const gap = 16;
  const cardWidth = (width - (gap * (numColumns + 1))) / numColumns;

  const renderCard = ({ item, index }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={[styles.cardContent, { backgroundColor: getCardColor(index) }]}>
        <Text style={styles.cardEmoji}>{item.image}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.sizeIndicator}>
          <Text style={styles.sizeText}>{cardWidth.toFixed(0)}px</Text>
        </View>
      </View>
    </View>
  );

  const getCardColor = (index) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ Layout Inteligente</Text>
        <View style={styles.orientationChip}>
          <Text style={styles.orientationChipText}>
            {orientation === 'portrait' ? '📱 Retrato' : '🖥️ Paisagem'}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {numColumns} coluna{numColumns > 1 ? 's' : ''} | Cards: {cardWidth.toFixed(0)}px
          </Text>
        </View>
      </View>

      <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        key={numColumns}
        numColumns={numColumns}
        contentContainerStyle={[styles.gridContainer, { gap }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  
  orientationChip: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 6,
  },
  
  orientationChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#495057',
  },
  
  statsContainer: {
    marginTop: 4,
  },
  
  statsText: {
    fontSize: 12,
    color: '#6c757d',
  },
  
  gridContainer: {
    padding: 16,
  },
  
  card: {
    marginBottom: 16,
  },
  
  cardContent: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  cardEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  
  sizeIndicator: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  sizeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});