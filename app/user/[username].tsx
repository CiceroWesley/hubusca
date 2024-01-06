import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import useFetchUserRepository from '../../hooks/useFetchUserRepository';
import { A } from '@expo/html-elements';
import { useEffect } from 'react';

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
        {!loadingUser && userData && <View>
            <Image source={{uri: userData.avatar_url}} style = {{ width: 200, height: 200 }}/>
            <Text>Name:{userData.name}</Text>
            <Text>Login:{userData.login}</Text>
            <Text>Location:{userData.location}</Text>
            <Text>Id:{userData.id}</Text>
            <Text>Followers:{userData.followers}</Text>
            <Text>Public repositories:{userData.public_repos}</Text>
        </View>}
        {loadingRepository && <ActivityIndicator/>}

        <ScrollView>
          {!loadingRepository && repositoryData?.length != 0 &&
            <View>
              {repositoryData?.map((repository) => (
                <A href={repository.html_url}>
                  <View>
                    <Text>{repository.name}</Text>
                    <Text>{repository.language}</Text>
                    <Text>{repository.description}</Text>
                    <Text>{repository.created_at}</Text>
                    <Text>{repository.pushed_at}</Text>
                  </View>
                </A>
              ))}
            </View>
          }
        </ScrollView>



        {errorUser && <Text>{errorUser}</Text>}

    </View>
  )
}

export default user;