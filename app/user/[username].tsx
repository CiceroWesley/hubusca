import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import { useEffect } from 'react';

const user = () => {
  const { username } = useLocalSearchParams();
  const {loading, error, userData, fetchUserData} = useFetchUserData()

  useEffect(() => {
    const fetch = async () => {
      await fetchUserData(String(username));
      console.log(userData)
    }
    fetch();
  }, [])

  return (
    <View>
        {loading && <ActivityIndicator/>}
        {!loading && userData && <View>
            <Image source={{uri: userData.avatar_url}} style = {{ width: 200, height: 200 }}/>
            <Text>{userData.name}</Text>
            <Text>{userData.login}</Text>
            <Text>{userData.location}</Text>
            <Text>{userData.id}</Text>
            <Text>{userData.followers}</Text>
            <Text>{userData.public_repos}</Text>
        </View>}
    </View>
  )
}

export default user;