import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35'
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20
        }}
      >
        Sobre Nós
      </Text>

      <Text style={{ marginTop: 10, fontSize: 16 }}>
        O abrigo Amigo Fiel nasceu com a missão de transformar vidas: tanto de animais quanto de pessoas. Nosso trabalho é dedicado a oferecer um lar amoroso para cães e gatos de raça que foram abandonados, assim como para os vira-latas que encontramos nas ruas em situação de vulnerabilidade.

Com uma equipe apaixonada e voluntários comprometidos, resgatamos, cuidamos e disponibilizamos para adoção animais que merecem uma segunda chance. Cada adoção é um ato de amor que ajuda a reduzir o abandono e promove a conscientização sobre a importância da responsabilidade com os pets.

Adotar é mais do que acolher um animal é ganhar um amigo fiel para a vida.
      </Text>

    </ScrollView>
  );
}
