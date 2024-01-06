import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import useFetchUserData from '../hooks/useFetchUserData';

const search = () => {
  const [username, setUsername] = useState<string>();

  const {loading, error, userData, setUserData, fetchUserData} = useFetchUserData();

  const router = useRouter();
  
  const onPressSearch = async () => {
    await fetchUserData(String(username));
  }

  const newSearch = () => {
    setUsername('');
    setUserData(null);
  }

  
  const saveUser = async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      if(users == null){
        let user = [userData.login];
        await AsyncStorage.setItem('users', JSON.stringify(user));
        return;
      }
      let parsedUsers: any[] = JSON.parse(users);
      let newUsers : any[] = [];
      parsedUsers.forEach((element) => {
        newUsers.push(element)
      })
      if(!newUsers.includes(userData.login)){
        newUsers.push(userData.login)
      }
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
      
    } catch (error) {
      console.log(error)
    }
  }

  if(userData){
    saveUser()
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