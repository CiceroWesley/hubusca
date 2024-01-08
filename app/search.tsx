import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import useFetchUserData from '../hooks/useFetchUserData';
import UserInfo from '../components/UserInfo/UserInfo';
import { user } from '../types/types';

const search = () => {
  const [username, setUsername] = useState<string>();

  const {loading, error, userData, setUserData, fetchUserData} = useFetchUserData();

  const router = useRouter();
  
  const onPressSearch = async () => {
    const response = await fetchUserData(String(username));
    if(response && response!== 404){
      saveUser(response)
    }
  }

  const newSearch = () => {
    setUsername('');
    setUserData(undefined);
  }

  
  const saveUser = async (response : user) => {
    try {
      const users = await AsyncStorage.getItem('users');
      if(users == null){
        let user = [response.login];
        await AsyncStorage.setItem('users', JSON.stringify(user));
        return;
      }
      let parsedUsers: string[] = JSON.parse(users);
      let newUsers : string[] = [];
      parsedUsers.forEach((element) => {
        newUsers.push(element)
      })
      if(!newUsers.includes(response.login)){
        newUsers.push(response.login)
      }
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
      
    } catch (error) {
      console.log(error)
    }
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
        {!loading && userData && <UserInfo user={userData}/>}

        {userData && <Text onPress={() => newSearch()}>Fazer outra busca</Text>}
        
        {error && <Text>{error}</Text>}
    </View>
  )
}

export default search;