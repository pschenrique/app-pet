import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import { loginUser, getAllPets } from '../utils/database';

const { width, height } = Dimensions.get('window');

// Imagens para o carrossel (2 cachorros e 2 gatos)
const carouselImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800', type: 'cachorro' },
  { id: 2, url: 'https://images.unsplash.com/photo-1513360371669-5ad2f6b4f9b1?w=800', type: 'gato' },
  { id: 3, url: 'https://images.unsplash.com/photo-1568572933382-74b4406426cf?w=800', type: 'cachorro' },
  { id: 4, url: 'https://images.unsplash.com/photo-1541373944820-5ec7a5d1dd5c?w=800', type: 'gato' }
];

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Configurar loop infinito do carrossel
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('⚠️ Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    const result = await loginUser(username, password);
    setLoading(false);

    if (result.success) {
      Alert.alert('✅ Sucesso', `Bem-vindo(a) ${result.user.username}!`);
      navigation.navigate('PetList');
    } else {
      Alert.alert('❌ Erro', result.message);
    }
  };

  const handleViewPets = async () => {
    setLoading(true);
    const pets = await getAllPets();
    setLoading(false);
    navigation.navigate('PetList', { pets });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {/* Parte Superior - 40% com Carrossel */}
      <View style={styles.carouselContainer}>
        <Swiper
          ref={swiperRef}
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          loop={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          dotColor="rgba(255,255,255,0.5)"
          activeDotColor="#fff"
        >
          {carouselImages.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image
                source={{ uri: item.url }}
                style={styles.carouselImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.petType}>
                  {item.type === 'cachorro' ? '🐕 Adote um Cachorro' : '🐱 Adote um Gato'}
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
        <View style={styles.gradientOverlay}>
          <Text style={styles.title}>Adote um Amigo</Text>
          <Text style={styles.subtitle}>Dê um lar para quem precisa</Text>
        </View>
      </View>

      {/* Parte Inferior - 60% com Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>🐾 Entrar</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>👤 Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>🔒 Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.forgotButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotButtonText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewPetsButton}
          onPress={handleViewPets}
          disabled={loading}
        >
          <Text style={styles.viewPetsButtonText}>
            🐕 Ver pets disponíveis sem login
          </Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Cadastre-se grátis</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.demoInfo}>
          💡 Dica: Use usuário "usuario" e senha "123456" para testar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carouselContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  wrapper: {
    height: height * 0.4,
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: height * 0.4,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  petType: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  viewPetsButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  viewPetsButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
  },
  demoInfo: {
    textAlign: 'center',
    color: '#999',
    fontSize: 11,
    marginTop: 20,
    fontStyle: 'italic',
  },
});
