import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import PetListScreen from './screens/PetListScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import { initDatabase } from './utils/database';
import { ActivityIndicator, View } from 'react-native';
import SobreScreen from './screens/SobreScreen';
import EndrecoScreen from './screens/EnderecoScreen';
import ConsultaScreen from './screens/ConsultasScreen';
import AlvaraScreen from './screens/AlvarasScreen';
import ContatoScreen from './screens/ContatoScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      setIsReady(true);
    };
    setup();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PetList" 
          component={PetListScreen} 
          options={{ 
            title: '🐾 Pets Disponíveis',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#4CAF50'
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: '📝 Criar Conta' }}
        />
        <Stack.Screen
  name="Sobre"
  component={SobreScreen}
/>

        <Stack.Screen
  name="Endereco"
  component={EndrecoScreen}
/>
        <Stack.Screen
  name="Consulta"
  component={ConsultaScreen}
/>
        <Stack.Screen
  name="Alvara"
  component={AlvaraScreen}
/>

        <Stack.Screen
  name="Contato"
  component={ContatoScreen}
/>
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPasswordScreen} 
          options={{ title: '🔐 Recuperar Senha' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

