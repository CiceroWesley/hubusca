import { useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import useFetchUserRepository from '../../hooks/useFetchUserRepository';
import { useEffect } from 'react';
import UserInfoFull from '../../components/UserInfoFull/UserInfoFull';
import RepositoryInfo from '../../components/RepositoryInfo/RepositoryInfo';

const user = () => {
  const { username } = useLocalSearchParams();
  const {loading : loadingUser, error : errorUser, userData, fetchUserData} = useFetchUserData()
  const {loading : loadingRepository, error : errorRepository, repositoryData} = useFetchUserRepository(String(username));

  useEffect(() => {
    const fetch = async () => {
      await fetchUserData(String(username));
    }
    fetch();
  }, [])

  return (
    <View>
        {loadingUser && <ActivityIndicator/>}
        {!loadingUser && userData && <UserInfoFull user={userData}/>}
        {loadingRepository && <ActivityIndicator/>}

        <ScrollView>
          {!loadingRepository && repositoryData && repositoryData?.length != 0 &&
            <View>
              {repositoryData?.map((repository) => (
                <RepositoryInfo repository={repository} />
              ))}
            </View>
          }
        </ScrollView>
      
        {errorUser && <Text>{errorUser}</Text>}

    </View>
  )
}

export default user;