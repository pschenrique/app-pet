import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function ContatoScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1669658981858-b2ae0d7581a3'
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Contato
      </Text>

      <Text style={{ marginTop: 20 }}>
        Agendamento pelo telefone:
        (21) 99999-9999
      </Text>

      <Text>
        Segunda a Sexta: 08h às 17h
      </Text>

      <Text>
        Sábado: 08h às 12h
      </Text>
      
    </ScrollView>
  );
}
