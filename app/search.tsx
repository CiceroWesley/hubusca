import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import useFetchUserData from '../hooks/useFetchUserData';

const search = () => {
  const [username, setUsername] = useState<string>();
  const [search, setSearch] = useState<boolean>(false);

  const {loading, error, userData, setUserData, fetchUserData} = useFetchUserData();

  const router = useRouter();
  
  const onPressSearch = async () => {
    setSearch(true);
    fetchUserData(String(username));
  }

  const newSearch = () => {
    setUsername('');
    setUserData(null);
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

        {loading && <ActivityIndicator/>}
        {!loading && userData &&
          <View>
            <Pressable onPress={() => router.push({ pathname: `/user/${userData.login}`})}>
              <Image source={{uri: userData.avatar_url}} style = {{ width: 200, height: 200 }}/>
            </Pressable>
            <Text>{userData.name}</Text>
            <Text>{userData.login}</Text>
            <Text>{userData.location}</Text>
          </View>
        }

        {userData && <Text onPress={() => newSearch()}>Fazer outra busca</Text>}
        
        {error && <Text>{error}</Text>}
    </View>
  )
}

export default search;