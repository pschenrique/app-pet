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
import { resetPassword } from '../utils/database';

export default function ResetPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!username.trim() || !email.trim()) {
      Alert.alert('⚠️ Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    const result = await resetPassword(username, email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        '📧 Sucesso', 
        result.message,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('❌ Erro', result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Esqueceu a Senha?</Text>
      <Text style={styles.description}>
        Não se preocupe! Digite seu usuário e email para receber as instruções de recuperação.
      </Text>
      
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
        <Text style={styles.inputLabel}>📧 Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email cadastrado"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.resetButton} 
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.resetButtonText}>Enviar Instruções</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Lembrei minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
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
  },
});
