import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import instanceAxios from '../utils/axios';

const search = () => {
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<boolean>(false);
  
  const onPress = async () => {
    setError('')
    if(username != ''){
      setError('Digite o nome do usuário');
    }
    try {
      const response = await instanceAxios.get(`users/${username}`);
      setUserData(response.data);
      setSearch(true)

    } catch (errorC) {
      console.log(errorC);
      setError(errorC);
    }

  }

  return (
    <View>
        <Text>Buscar usuário</Text>
        {!userData && 
        <View>
          <TextInput value={username} onChangeText={(value) => setUsername(value)} />
          <Pressable onPress={onPress}>
            <Text>Pesquisar</Text>
          </Pressable>
        </View>}

        {userData &&
          <View>
            <Text>{userData.avatar_url}</Text>
            <Text>{userData.name}</Text>
            <Text>{userData.login}</Text>
            <Text>{userData.location}</Text>
          </View>
        }

        {userData && <Text onPress={() => setUserData()}>Fazer outra busca</Text>}
        
    </View>
  )
}

export default search;