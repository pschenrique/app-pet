import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default function CastracaoScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        🐶 Castração Gratuita
      </Text>

      <Text style={styles.text}>
        A castração é importante para a saúde dos animais
        e ajuda a reduzir o abandono de cães e gatos.
      </Text>

      <Text style={styles.subtitle}>
        Locais de Atendimento
      </Text>

      <Text style={[styles.text, { marginBottom: 20 }]}>
        Centro Veterinário Municipal{"\n"}
        Campanhas da Prefeitura{"\n"}
        ONGs parceiras
      </Text>

      <Text style={styles.text}>
        Disponibilazos nosso espaço para castração gratuita de seu animal, em todos os sábados da última semana do mês.
      </Text>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('PetList')}
      >
        <Text style={styles.buttonText}>
          🏠 Voltar para Adoção
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
  },

  bottomButton: {
    backgroundColor: '#4CAF50',
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
