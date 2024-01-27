import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import UserInfo from '../../components/UserInfo/UserInfo';
import { user } from '../../types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styled} from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const SearchUser = styled.Text`
  font-weight: bold;
  font-size: 26px;
  margin-top: 20px;
`

const Button = styled.TouchableOpacity`
  background-color: #95f5f0;
  padding: 15px;
  border-radius: 50px;
  align-items: center;
`

const TextInputS = styled.TextInput`
  align-items: center;
  padding: 2px;
  width: 100%;
`

const WraperTextInputIcon = styled.View`
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  margin-bottom: 10px;
`

const WraperView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WraperSpace = styled.View`
  margin-top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const search = () => {
  const [username, setUsername] = useState<string>();

  const {loading, error, userData, setUserData, fetchUserData} = useFetchUserData();

  const router = useRouter();
  
  const onPressSearch = async () => {
    const response = await fetchUserData(String(username));
    if(response && response!== 404){
      // console.log(response)
      saveUser(response)
      setUsername('');
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
      if(!newUsers.includes(response.login) && response.login !== ''){
        newUsers.push(response.login)
      }
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <WraperView>
        <SearchUser>Busque algum usuário do Github</SearchUser>
        {!userData && 
        <WraperSpace>
          <Text>Insira o nome de usuário:</Text>
          <WraperTextInputIcon>
            <Ionicons name="search" size={16} color="black" />
            <TextInputS placeholder='Username' onChangeText={(value) => setUsername(value)}/>
          </WraperTextInputIcon>
          <Button onPress={onPressSearch}><Text>Pesquisar</Text></Button>
        </WraperSpace>}

        {loading && <ActivityIndicator size={'large'}/>}
        {!loading && userData && <UserInfo user={userData}/>}

        {userData && <Button onPress={() => newSearch()}><Text>Nova busca</Text></Button>}
        
        {error && <Text>{error}</Text>}
      </WraperView>
    </SafeAreaView>
    
  )
}

export default search;