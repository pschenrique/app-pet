import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getAllPets } from '../utils/database';

export default function PetListScreen({ route, navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      let allPets;
      if (route.params?.pets) {
        allPets = route.params.pets;
      } else {
        allPets = await getAllPets();
      }
      setPets(allPets);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pets');
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = (petName) => {
    const handleMenuOption = (option) => {
  let mensagem = '';

  switch (option) {
    case 'sobre':
      mensagem =
        'Somos uma organização dedicada à adoção responsável de animais.';
      break;

    case 'endereco':
      mensagem =
        'Rua das Flores, 69\nCentro\nDuque de Caxias - RJ';
      break;

    case 'consultas':
      mensagem =
        'Consultas disponíveis de segunda a sexta das 08h às 17h.';
      break;

    case 'alvaras':
      mensagem =
        'Todos os documentos e alvarás estão regularizados.';
      break;

    case 'contato':
      mensagem =
        'Telefone: (21) 99999-9999\nEmail: contato@adocao.com';
      break;
  }

  Alert.alert('Informação', mensagem);
  setMenuOpen(false);
};


    Alert.alert(
      '🐾 Iniciar Adoção',
      `Você tem interesse em adotar o ${petName}?\n\nEntre em contato conosco para mais informações!`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Quero Adotar', onPress: () => Alert.alert('Obrigado!', 'Entraremos em contato em breve!') }
      ]
    );
  };

  const renderPetCard = ({ item }) => (
    <TouchableOpacity style={styles.petCard} activeOpacity={0.9}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.petImage}
        resizeMode="cover"
      />
      <View style={styles.petInfo}>
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petTypeIcon}>
            {item.type === 'cachorro' ? '🐕' : '🐱'}
          </Text>
        </View>
        
        <Text style={styles.petBreed}>{item.breed}</Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.petDetails}>📅 {item.age} ano(s)</Text>
          <Text style={styles.petDetails}>📍 {item.location}</Text>
        </View>
        
        <Text style={styles.petDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <TouchableOpacity 
          style={styles.adoptButton}
          onPress={() => handleAdopt(item.name)}
        >
          <Text style={styles.adoptButtonText}>❤️ Quero Adotar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando pets...</Text>
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🐕</Text>
        <Text style={styles.emptyTitle}>Nenhum pet encontrado</Text>
        <Text style={styles.emptyText}>Volte em breve para ver novos amigos!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🐾</Text>
        <Text style={styles.headerTitle}>Pets disponíveis para adoção</Text>
        <Text style={styles.headerCount}>{pets.length} amigos</Text>
      </View>

      <TouchableOpacity
  style={styles.menuButton}
  onPress={() => setMenuOpen(!menuOpen)}
>
  <Text style={styles.menuButtonText}>☰</Text>
</TouchableOpacity>

{menuOpen && (
  <View style={styles.sideMenu}>
    <Text style={styles.menuTitle}>
      Menu
    </Text>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Sobre')}
>
  <Text style={styles.menuItemText}>
    ℹ️ Sobre
  </Text>
</TouchableOpacity>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Endereco')}
>
  <Text style={styles.menuItemText}>
    📍 Endereço
  </Text>
</TouchableOpacity>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Consulta')}
>
  <Text style={styles.menuItemText}>
    🔍 Consultas
  </Text>
</TouchableOpacity>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Alvara')}
>
  <Text style={styles.menuItemText}>
    📄 Alvarás
  </Text>
</TouchableOpacity>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => navigation.navigate('Contato')}
>
  <Text style={styles.menuItemText}>
    📞 Contato
  </Text>
</TouchableOpacity>

    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setMenuOpen(false)}
    >
      <Text style={styles.closeButtonText}>
        Fechar
      </Text>
    </TouchableOpacity>
  </View>
)}
      
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPetCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    opacity: 0.9,
  },
  listContainer: {
    padding: 15,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: 200,
  },
  petInfo: {
    padding: 15,
  },
  petHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  petTypeIcon: {
    fontSize: 24,
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  petDetails: {
    fontSize: 13,
    color: '#888',
  },
  petDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 15,
  },
  adoptButton: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  menuButton: {
  position: 'absolute',
  top: 25,
  left: 15,
  zIndex: 999,
  backgroundColor: '#fff',
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 8,
},

menuButtonText: {
  fontSize: 28,
  fontWeight: 'bold',
},

sideMenu: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 260,
  height: '100%',
  backgroundColor: '#fff',
  zIndex: 998,
  paddingTop: 80,
  paddingHorizontal: 20,
  elevation: 10,
},

menuTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 25,
  color: '#4CAF50',
},

menuItem: {
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

menuItemText: {
  fontSize: 18,
  color: '#333',
},

closeButton: {
  marginTop: 30,
  backgroundColor: '#4CAF50',
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
},

closeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});
