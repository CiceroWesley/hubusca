import { useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import useFetchUserData from '../../../hooks/useFetchUserData';
import useFetchUserRepository from '../../../hooks/useFetchUserRepository';
import { useEffect } from 'react';
import UserInfoFull from '../../../components/UserInfoFull/UserInfoFull';
import RepositoryInfo from '../../../components/RepositoryInfo/RepositoryInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';



const WraperView = styled.View`
  display: flex;
  flex-direction: col;
  align-items: center;
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
        {loadingUser && <ActivityIndicator/>}
        {!loadingUser && userData && <UserInfoFull user={userData}/>}
        {loadingRepository && <ActivityIndicator size={'large'}/>}

        
        
          {!loadingRepository && repositoryData && repositoryData?.length != 0 &&
            <View>
              {repositoryData?.map((repository) => (
                <RepositoryInfo repository={repository} />
              ))}
            </View>
          }
      
        {errorUser && <Text>{errorUser}</Text>}

      </WraperView>
    </SafeAreaView>
    
  )
}

export default user;