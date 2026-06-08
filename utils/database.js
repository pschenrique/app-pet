import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para armazenamento
const USERS_KEY = '@petadoption:users';
const PETS_KEY = '@petadoption:pets';

// Dados iniciais de pets
const initialPets = [
  {
    id: '1',
    name: 'Rex',
    type: 'cachorro',
    breed: 'Labrador',
    age: 2,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
    description: 'Cachorro amigável e brincalhão, adora crianças',
    location: 'São Paulo - SP'
  },
  {
    id: '2',
    name: 'Mimi',
    type: 'gato',
    breed: 'Siamês',
    age: 3,
    image: 'https://images.unsplash.com/photo-1513360371669-5ad2f6b4f9b1?w=500',
    description: 'Gato carinhoso e tranquilo, perfeito para apartamento',
    location: 'Rio de Janeiro - RJ'
  },
  {
    id: '3',
    name: 'Thor',
    type: 'cachorro',
    breed: 'Husky Siberiano',
    age: 1,
    image: 'https://images.unsplash.com/photo-1568572933382-74b4406426cf?w=500',
    description: 'Filhote cheio de energia, adora brincar',
    location: 'Belo Horizonte - MG'
  },
  {
    id: '4',
    name: 'Luna',
    type: 'gato',
    breed: 'Persa',
    age: 4,
    image: 'https://images.unsplash.com/photo-1541373944820-5ec7a5d1dd5c?w=500',
    description: 'Gata dócil e companheira, ama carinho',
    location: 'Porto Alegre - RS'
  }
];

// Inicializar banco de dados
export const initDatabase = async () => {
  try {
    // Inicializar usuários
    const users = await AsyncStorage.getItem(USERS_KEY);
    if (!users) {
      // Criar um usuário padrão para teste
      const defaultUsers = [
        {
          id: '1',
          username: 'usuario',
          password: '123456',
          email: 'usuario@email.com'
        }
      ];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Inicializar pets
    const pets = await AsyncStorage.getItem(PETS_KEY);
    if (!pets) {
      await AsyncStorage.setItem(PETS_KEY, JSON.stringify(initialPets));
    }
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database init error:', error);
    return false;
  }
};

// Funções de autenticação
export const loginUser = async (username, password) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return { success: true, user: { id: user.id, username: user.username, email: user.email } };
    } else {
      return { success: false, message: 'Usuário ou senha inválidos' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Erro ao fazer login' };
  }
};

export const registerUser = async (username, password, email) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Verificar se usuário já existe
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Usuário já existe' };
    }
    
    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      email
    };
    
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Cadastro realizado com sucesso!' };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Erro ao cadastrar' };
  }
};

export const resetPassword = async (username, email) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const user = users.find(u => u.username === username && u.email === email);
    
    if (user) {
      // Em um app real, enviaria email. Aqui só simulamos
      return { 
        success: true, 
        message: `Instruções de recuperação enviadas para ${email}\n\n(Sua senha atual é: ${user.password})` 
      };
    } else {
      return { success: false, message: 'Usuário ou email não encontrados' };
    }
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, message: 'Erro ao recuperar senha' };
  }
};

export const getAllPets = async () => {
  try {
    const petsJson = await AsyncStorage.getItem(PETS_KEY);
    return petsJson ? JSON.parse(petsJson) : [];
  } catch (error) {
    console.error('Get pets error:', error);
    return [];
  }
};

export const addPet = async (pet) => {
  try {
    const petsJson = await AsyncStorage.getItem(PETS_KEY);
    const pets = petsJson ? JSON.parse(petsJson) : [];
    const newPet = { ...pet, id: Date.now().toString() };
    pets.push(newPet);
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
    return { success: true, pet: newPet };
  } catch (error) {
    console.error('Add pet error:', error);
    return { success: false, message: 'Erro ao adicionar pet' };
  }
};
