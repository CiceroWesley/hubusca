import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, Image, Pressable } from 'react-native';
import instanceAxios from '../utils/axios';

const search = () => {
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<boolean>(false);

  const router = useRouter();
  
  const onPressSearch = async () => {
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

  const newSearch = () => {
    setUserData();
    setUsername();
  }

  return (
    <View>
        <Text>Buscar usuário</Text>
        {!userData && 
        <View>
          <TextInput value={username} onChangeText={(value) => setUsername(value)} />
          <Pressable onPress={onPressSearch}>
            <Text>Pesquisar</Text>
          </Pressable>
        </View>}

        {userData &&
          <View>
            <Pressable onPress={() => router.push({ pathname: `/user/${userData.login}`})}>
              <Image source={{uri: userData.avatar_url}} style = {{ width: 200, height: 200 }}/>
            </Pressable>
            <Text>{userData.login}</Text>
            <Text>{userData.name}</Text>
            <Text>{userData.location}</Text>
          </View>
        }

        {userData && <Text onPress={() => newSearch()}>Fazer outra busca</Text>}
        
    </View>
  )
}

export default search;