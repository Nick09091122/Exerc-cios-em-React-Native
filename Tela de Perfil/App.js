import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  useColorScheme,
  Animated,
  Easing,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

const { width: screenWidth } = Dimensions.get('window');

// ==================== TEMAS ====================
const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FFCC00',
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    card: '#FFFFFF',
    border: '#C6C6C8',
    likeButton: '#FF3B30',
    followButton: '#007AFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#30D158',
    danger: '#FF453A',
    warning: '#FFD60A',
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#98989E',
    card: '#1C1C1E',
    border: '#38383A',
    likeButton: '#FF453A',
    followButton: '#0A84FF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

// ==================== STYLED COMPONENTS ====================
const ThemeContext = React.createContext();

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const CustomThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    if (!manualOverride) {
      setIsDark(systemScheme === 'dark');
    }
  }, [systemScheme, manualOverride]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setManualOverride(true);
  };

  const resetTheme = () => {
    setManualOverride(false);
    setIsDark(systemScheme === 'dark');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, resetTheme, manualOverride }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Typography
const H1 = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const H2 = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Body = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 20px;
`;

const Caption = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Button
const Button = styled.TouchableOpacity`
  background-color: ${({ theme, variant = 'primary' }) => {
    switch(variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.danger;
      case 'follow': return theme.colors.followButton;
      default: return theme.colors.primary;
    }
  }};
  padding: ${({ theme, size = 'md' }) => {
    switch(size) {
      case 'sm': return `${theme.spacing.xs}px ${theme.spacing.md}px`;
      case 'lg': return `${theme.spacing.md}px ${theme.spacing.xl}px`;
      default: return `${theme.spacing.sm}px ${theme.spacing.lg}px`;
    }
  }};
  border-radius: 8px;
  align-items: center;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: ${({ size = 'md' }) => size === 'sm' ? '12px' : '14px'};
  font-weight: 600;
`;

// Card
const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ $rounded }) => $rounded ? '16px' : '12px'};
  padding: ${({ theme, $spacing = 'md' }) => {
    const spacingMap = { xs: theme.spacing.xs, sm: theme.spacing.sm, md: theme.spacing.md, lg: theme.spacing.lg, xl: theme.spacing.xl };
    return `${spacingMap[$spacing]}px`;
  }};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme, $noMargin }) => $noMargin ? '0px' : `${theme.spacing.md}px`};
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

// ==================== BARRA DE PROGRESSO ANIMADA ====================
const ProgressBar = ({ value = 0, height = 6, showLabel = false }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetValue = Math.min(Math.max(value, 0), 100);
    
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: targetValue,
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: targetValue,
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#FF3B30', '#FFCC00', '#34C759'],
  });

  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ width: '100%' }}>
      {showLabel && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Caption>Completude do perfil</Caption>
          <Caption style={{ fontWeight: 'bold' }}>{Math.round(value)}%</Caption>
        </View>
      )}
      <View style={{ backgroundColor: '#E5E5EA', borderRadius: 3, height, overflow: 'hidden' }}>
        <Animated.View style={{ width, backgroundColor, height, borderRadius: 3 }} />
      </View>
    </View>
  );
};

// ==================== COMPONENTES DO PERFIL ====================
const PostCard = ({ post, onLike, onPress }) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Card $spacing="md" style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.postUser}>
              <View style={[styles.avatarSmall, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.avatarTextSmall}>{post.userAvatar}</Text>
              </View>
              <View>
                <Text style={[styles.postUserName, { color: theme.colors.text }]}>{post.userName}</Text>
                <Caption>{post.timeAgo}</Caption>
              </View>
            </View>
            <Caption>{post.location}</Caption>
          </View>
          
          <Body style={styles.postContent}>{post.content}</Body>
          
          <View style={styles.postStats}>
            <TouchableOpacity onPress={() => onLike(post.id)} style={styles.statButton}>
              <Text style={[styles.statIcon, post.liked && { color: theme.colors.likeButton }]}>
                {post.liked ? '❤️' : '🤍'}
              </Text>
              <Caption>{post.likes}</Caption>
            </TouchableOpacity>
            <View style={styles.statButton}>
              <Text style={styles.statIcon}>💬</Text>
              <Caption>{post.comments}</Caption>
            </View>
            <View style={styles.statButton}>
              <Text style={styles.statIcon}>🔄</Text>
              <Caption>{post.shares}</Caption>
            </View>
          </View>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
};

// ==================== PÁGINA PRINCIPAL DO PERFIL ====================
export default function ProfilePage() {
  return (
    <CustomThemeProvider>
      <ProfileContent />
    </CustomThemeProvider>
  );
}

const ProfileContent = () => {
  const { theme, isDark, toggleTheme, resetTheme, manualOverride } = useTheme();
  const [profileProgress, setProfileProgress] = useState(65);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('posts');
  const [posts, setPosts] = useState([
    {
      id: '1',
      userName: 'Ana Silva',
      userAvatar: 'AS',
      timeAgo: '2 horas atrás',
      location: 'São Paulo, SP',
      content: 'Acabei de lançar meu novo projeto! Muito feliz com o resultado. #ReactNative #DevLife',
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false,
    },
    {
      id: '2',
      userName: 'Ana Silva',
      userAvatar: 'AS',
      timeAgo: '5 horas atrás',
      location: 'Home Office',
      content: 'Estudando novas tecnologias para melhorar a performance dos apps. O conhecimento nunca é demais! 💪',
      likes: 189,
      comments: 23,
      shares: 8,
      liked: true,
    },
    {
      id: '3',
      userName: 'Ana Silva',
      userAvatar: 'AS',
      timeAgo: '1 dia atrás',
      location: 'Evento Tech',
      content: 'Palestra incrível sobre UI/UX! Aprendi muito sobre design responsivo e animações.',
      likes: 567,
      comments: 89,
      shares: 34,
      liked: false,
    },
  ]);

  const stats = [
    { label: 'Posts', value: '48' },
    { label: 'Seguidores', value: '12.5K' },
    { label: 'Seguindo', value: '1.2K' },
  ];

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const tabs = ['posts', 'fotos', 'videos', 'destaques'];

  const getTabContent = () => {
    switch(selectedTab) {
      case 'posts':
        return posts.map(post => (
          <PostCard key={post.id} post={post} onLike={handleLike} onPress={() => {}} />
        ));
      case 'fotos':
        return (
          <View style={styles.gridContainer}>
            {[1,2,3,4,5,6].map((item) => (
              <TouchableOpacity key={item} style={styles.gridItem}>
                <View style={[styles.gridPhoto, { backgroundColor: theme.colors.primary + '30' }]}>
                  <Text style={{ fontSize: 40 }}>📸</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return (
          <Card $spacing="xl" style={styles.emptyState}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>📭</Text>
            <H2 style={{ textAlign: 'center' }}>Em breve</H2>
            <Body style={{ textAlign: 'center' }}>Conteúdo em desenvolvimento</Body>
          </Card>
        );
    }
  };

  return (
    <Container>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header com tema */}
        <View style={[styles.themeHeader, { backgroundColor: theme.colors.backgroundSecondary, borderBottomColor: theme.colors.border }]}>
          <View style={styles.themeControls}>
            <Caption>{isDark ? '🌙 Dark' : '☀️ Light'}</Caption>
            <Switch value={isDark} onValueChange={toggleTheme} />
            {manualOverride && (
              <TouchableOpacity onPress={resetTheme}>
                <Caption style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                  Reset
                </Caption>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Capa do Perfil */}
        <View style={styles.coverContainer}>
          <View style={[styles.coverImage, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.coverEmoji}>🌟</Text>
          </View>
          
          {/* Avatar */}
          <View style={[styles.avatarContainer, { borderColor: theme.colors.background }]}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.secondary }]}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
          </View>
        </View>

        {/* Informações do Perfil */}
        <View style={styles.profileInfo}>
          <View style={styles.nameSection}>
            <H1>Ana Silva</H1>
            <TouchableOpacity onPress={() => setIsFollowing(!isFollowing)}>
              <Button 
                variant={isFollowing ? 'secondary' : 'follow'} 
                size="sm"
                style={styles.followButton}
              >
                <ButtonText size="sm">
                  {isFollowing ? '✓ Seguindo' : '+ Seguir'}
                </ButtonText>
              </Button>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bioSection}>
            <Body>🚀 Desenvolvedora Mobile React Native</Body>
            <Body>💡 Apaixonada por UI/UX e animações</Body>
            <Body>📍 São Paulo, Brasil</Body>
            <View style={styles.linkContainer}>
              <Text style={styles.linkIcon}>🔗</Text>
              <Body style={{ color: theme.colors.primary }}>github.com/anasilva</Body>
            </View>
          </View>

          {/* Stats com Progress Bar */}
          <Card $spacing="md" style={styles.statsCard}>
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                  <Caption>{stat.label}</Caption>
                </View>
              ))}
            </View>
            
            <View style={styles.progressSection}>
              <ProgressBar value={profileProgress} height={6} showLabel />
              <TouchableOpacity 
                onPress={() => setProfileProgress(Math.min(100, profileProgress + 10))}
                style={{ marginTop: 8 }}
              >
                <Caption style={{ color: theme.colors.primary, textAlign: 'center' }}>
                  + Completar perfil
                </Caption>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { borderBottomColor: theme.colors.border }]}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive, { borderBottomColor: selectedTab === tab ? theme.colors.primary : 'transparent' }]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, { color: selectedTab === tab ? theme.colors.primary : theme.colors.textSecondary }]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo das Tabs */}
        <View style={styles.contentContainer}>
          {getTabContent()}
        </View>

        {/* Footer */}
        <Card $spacing="md" $noMargin style={styles.footerCard}>
          <View style={styles.footerContent}>
            <Caption>Perfil 65% completo</Caption>
            <ProgressBar value={profileProgress} height={4} />
            <Caption style={{ textAlign: 'center', marginTop: 12 }}>
              Conecte-se com outros devs e compartilhe conhecimento! 💙
            </Caption>
          </View>
        </Card>
        
      </ScrollView>
    </Container>
  );
};

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  themeHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  themeControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  coverContainer: {
    position: 'relative',
  },
  coverImage: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverEmoji: {
    fontSize: 48,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    borderRadius: 60,
    borderWidth: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTextSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  followButton: {
    paddingHorizontal: 16,
  },
  bioSection: {
    marginBottom: 20,
    gap: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  linkIcon: {
    fontSize: 14,
  },
  statsCard: {
    marginBottom: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressSection: {
    marginTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabActive: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  postCard: {
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '600',
  },
  postContent: {
    marginBottom: 12,
    lineHeight: 20,
  },
  postStats: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (screenWidth - 48) / 3,
    marginBottom: 12,
  },
  gridPhoto: {
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  footerCard: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  footerContent: {
    gap: 8,
  },
});