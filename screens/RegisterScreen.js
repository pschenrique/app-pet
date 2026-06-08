import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { registerUser } from '../utils/database';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('⚠️ Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('⚠️ Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('⚠️ Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('⚠️ Erro', 'Digite um email válido');
      return;
    }

    setLoading(true);
    const result = await registerUser(username, password, email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        '✅ Sucesso', 
        result.message,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('❌ Erro', result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Criar Conta</Text>
      <Text style={styles.subtitle}>Cadastre-se e ajude um pet a encontrar um lar</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>👤 Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Escolha um usuário"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>📧 Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu melhor email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>🔒 Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>✓ Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha novamente"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.loginButtonText}>← Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
});
