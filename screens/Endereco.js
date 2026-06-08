import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function EnderecoScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1682310071124-33632135b2ee'
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Endereço
      </Text>

      <Text style={{ marginTop: 20 }}>
        Rua das Flores, 69
      </Text>

      <Text>
        Centro - Duque de Caxias
      </Text>

      <Text>
        CEP: 20000-000
      </Text>
      
    </ScrollView>
  );
}
