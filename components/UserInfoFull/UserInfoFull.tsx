import { StatusBar } from 'expo-status-bar';
import { Pressable, Image, Text, View } from 'react-native';

const UserInfoFull = ({user}) => {
  return (
    <View >
      <Image source={{uri: user.avatar_url}} style = {{ width: 200, height: 200 }}/>
        <Text>Name:{user.name}</Text>
        <Text>Login:{user.login}</Text>
        <Text>Location:{user.location}</Text>
        <Text>Id:{user.id}</Text>
        <Text>Followers:{user.followers}</Text>
        <Text>Public repositories:{user.public_repos}</Text>
    </View>
  );
}

export default UserInfoFull;

