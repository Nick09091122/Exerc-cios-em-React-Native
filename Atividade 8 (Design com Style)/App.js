import React, { createContext, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  View,
} from 'react-native';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

// ==================== TEMA ====================
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
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 38 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 30 },
    body: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
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
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 38 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 30 },
    body: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
  },
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

const CustomThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// ==================== TYPOGRAPHY ====================
const H1 = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  line-height: ${({ theme }) => theme.typography.h1.lineHeight}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const H2 = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  line-height: ${({ theme }) => theme.typography.h2.lineHeight}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Body = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Caption = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// ==================== BUTTON ====================
const Button = styled.TouchableOpacity`
  background-color: ${({ theme, variant = 'primary' }) => {
    switch(variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.danger;
      case 'success': return theme.colors.success;
      default: return theme.colors.primary;
    }
  }};
  padding: ${({ theme, size = 'md' }) => {
    switch(size) {
      case 'sm': return `${theme.spacing.sm}px ${theme.spacing.md}px`;
      case 'lg': return `${theme.spacing.md}px ${theme.spacing.xl}px`;
      default: return `${theme.spacing.sm}px ${theme.spacing.lg}px`;
    }
  }};
  border-radius: ${({ theme, rounded = false }) => rounded ? '25px' : '8px'};
  align-items: center;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: ${({ theme, size = 'md' }) => {
    switch(size) {
      case 'sm': return '14px';
      case 'lg': return '18px';
      default: return '16px';
    }
  }};
  font-weight: 600;
`;

// ==================== CARD ====================
const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme, $rounded = false }) => $rounded ? '16px' : '12px'};
  padding: ${({ theme, $spacing = 'md' }) => {
    switch($spacing) {
      case 'xs': return `${theme.spacing.xs}px`;
      case 'sm': return `${theme.spacing.sm}px`;
      case 'md': return `${theme.spacing.md}px`;
      case 'lg': return `${theme.spacing.lg}px`;
      case 'xl': return `${theme.spacing.xl}px`;
      default: return `${theme.spacing.md}px`;
    }
  }};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  margin-bottom: ${({ theme, $noMargin = false }) => $noMargin ? '0px' : `${theme.spacing.md}px`};
`;

// ==================== COMPONENTES ADICIONAIS ====================
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.View`
  flex-direction: column;
`;

const Spacing = styled.View`
  margin-bottom: ${({ theme, $size = 'md' }) => theme.spacing[$size]}px;
`;

// ==================== APP PRINCIPAL ====================
export default function App() {
  return (
    <CustomThemeProvider>
      <MainScreen />
    </CustomThemeProvider>
  );
}

const MainScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Container>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background}
      />
      
      <Header>
        <H1>Styled Components</H1>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Caption>{isDark ? '🌙 Dark' : '☀️ Light'}</Caption>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        
        {/* Exemplo de Typography */}
        <Card $spacing="lg" $rounded>
          <H1>Exemplo de Tipografia</H1>
          <H2>Subtítulo H2</H2>
          <Body>
            Este é um texto Body. O styled-components permite criar componentes 
            de texto reutilizáveis e temáticos.
          </Body>
          <Spacing $size="sm" />
          <Caption>Texto Caption para informações auxiliares</Caption>
        </Card>

        {/* Exemplo de diferentes espaçamentos no Card */}
        <H2>Cards com diferentes $spacing</H2>
        
        <Card $spacing="xs">
          <Body>Card com spacing XS (padding pequeno)</Body>
        </Card>

        <Card $spacing="sm">
          <Body>Card com spacing SM</Body>
        </Card>

        <Card $spacing="md">
          <Body>Card com spacing MD (padrão)</Body>
        </Card>

        <Card $spacing="lg">
          <Body>Card com spacing LG</Body>
        </Card>

        {/* Exemplo de Botões */}
        <H2>Botões com diferentes variantes</H2>
        
        <Card $spacing="md">
          <Column>
            <Button variant="primary" onPress={() => alert('Primary clicado!')}>
              <ButtonText>Botão Primary</ButtonText>
            </Button>
            <Spacing $size="sm" />
            <Button variant="secondary" onPress={() => alert('Secondary clicado!')}>
              <ButtonText>Botão Secondary</ButtonText>
            </Button>
            <Spacing $size="sm" />
            <Button variant="success" onPress={() => alert('Success clicado!')}>
              <ButtonText>Botão Success</ButtonText>
            </Button>
            <Spacing $size="sm" />
            <Button variant="danger" onPress={() => alert('Danger clicado!')}>
              <ButtonText>Botão Danger</ButtonText>
            </Button>
          </Column>
        </Card>

        {/* Botões com diferentes tamanhos */}
        <H2>Botões com diferentes tamanhos</H2>
        
        <Card $spacing="md">
          <Column>
            <Button size="sm" onPress={() => alert('Small clicado!')}>
              <ButtonText size="sm">Botão Small</ButtonText>
            </Button>
            <Spacing $size="sm" />
            <Button size="md" onPress={() => alert('Medium clicado!')}>
              <ButtonText size="md">Botão Medium</ButtonText>
            </Button>
            <Spacing $size="sm" />
            <Button size="lg" onPress={() => alert('Large clicado!')}>
              <ButtonText size="lg">Botão Large</ButtonText>
            </Button>
          </Column>
        </Card>

        {/* Botões arredondados */}
        <H2>Botões arredondados</H2>
        
        <Card $spacing="md">
          <Row>
            <Button rounded onPress={() => alert('Rounded clicado!')}>
              <ButtonText>Round</ButtonText>
            </Button>
            <Button disabled onPress={() => {}}>
              <ButtonText>Disabled</ButtonText>
            </Button>
          </Row>
        </Card>

        {/* Card complexo com informações */}
        <H2>Card com conteúdo complexo</H2>
        
        <Card $spacing="lg" $rounded>
          <Row>
            <Column>
              <H2>Informações do Tema</H2>
              <Body>Modo atual: {isDark ? 'Dark' : 'Light'}</Body>
              <Body>Cor primária: {theme.colors.primary}</Body>
              <Body>Fundo: {theme.colors.background}</Body>
            </Column>
          </Row>
          <Spacing $size="md" />
          <Button variant="primary" onPress={toggleTheme}>
            <ButtonText>Alternar Tema</ButtonText>
          </Button>
        </Card>

        {/* Grid de Cards com diferentes espaçamentos */}
        <H2>Grid de Cards</H2>
        
        <Row>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Card $spacing="sm">
              <Body>Card 1</Body>
              <Caption>Padding SM</Caption>
            </Card>
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Card $spacing="lg">
              <Body>Card 2</Body>
              <Caption>Padding LG</Caption>
            </Card>
          </View>
        </Row>

        {/* Card sem margem */}
        <Card $spacing="md" $noMargin>
          <Body>Este card não tem margin bottom</Body>
        </Card>
        <Caption style={{ marginTop: 8 }}>Card sem margem acima 👆</Caption>

      </Content>
    </Container>
  );
}