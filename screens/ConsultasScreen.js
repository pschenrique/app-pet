import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function ConsultasScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1683117927786-f146451082fb'
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Consultas
      </Text>

      <Text style={{ marginTop: 20 }}>
        Olá! por aqui você pode marcar a consulta para castração de animal de estimação, use o e-mail abaixo para reservar um horário.
      </Text>

     <Text style={{ marginTop: 20 }}>
        adocaoamigofielconsulta@gmail.com
      </Text>

      <Text style={{ marginTop: 20 }}>
        OBS: CARO USUÁRIO, DISPONIBILIZAMOS NOSSO ABRIGO PARA ONGS LOCAIS QUE REALIZAM CASTRAÇÃO GRATUITA. ESTAMOS DISPONÍVEIS AOS SÁBADOS E DOMINGOS DA ÚLTIMA SEMANA DE CADA MÊS.
      </Text>
      
    </ScrollView>
  );
}
