import { useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import useFetchUserData from '../../../hooks/useFetchUserData';
import useFetchUserRepository from '../../../hooks/useFetchUserRepository';
import { useEffect } from 'react';
import UserInfoFull from '../../../components/UserInfoFull/UserInfoFull';
import RepositoryInfo from '../../../components/RepositoryInfo/RepositoryInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';



const WraperView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WraperRepo = styled.View`
  margin-left: 6px;
  margin-right: 6px;
`

const WraperSafeView = styled.SafeAreaView`
  margin-bottom: 15px;
`

const user = () => {
  const { username } = useLocalSearchParams();
  const {loading : loadingUser, error : errorUser, userData, fetchUserData} = useFetchUserData()
  const {loading : loadingRepository, error : errorRepository, repositoryData} = useFetchUserRepository(String(username));

  useEffect(() => {
    const fetch = async () => {
      await fetchUserData(String(username));
    }
    fetch();
  }, [username])

  return (
    <SafeAreaView>
      <WraperView>
        {loadingUser && <ActivityIndicator size={'large'}/>}
        {!loadingUser && userData && <UserInfoFull user={userData}/>}
        {loadingRepository && <ActivityIndicator size={'large'}/>}
        {errorUser && <Text>{errorUser}</Text>}

      </WraperView>
      <WraperRepo>
        {!loadingRepository && repositoryData && repositoryData?.length != 0 && <FlatList data={repositoryData} renderItem={({item}) => (<RepositoryInfo repository={item}/>)}/>
      }
      </WraperRepo>
      
    </SafeAreaView>
  )
}

export default user;