import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function AlvarasScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1669658981976-4b72e927a902'
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Alvarás
      </Text>

      <Text style={{ marginTop: 20 }}>
        Alvará Sanitário Nº 12345
      </Text>

      <Text>
        Licença Ambiental Nº 67890
      </Text>

      <Text>
        Validade: 31/12/2026
      </Text>
      
    </ScrollView>
  );
}
