import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router/src/hooks';
import { user, userWrapper } from '../../types/types';

const UserInfo = ({user} : userWrapper) => {
  const router = useRouter()
  return (
    <View >
      <Pressable onPress={() => router.push({ pathname: `/user/${user.login}`})}>
        <Image source={{uri: user.avatar_url}} style = {{ width: 200, height: 200 }}/>
      </Pressable>
      <Text>{user.name}</Text>
      <Text>{user.login}</Text>
      <Text>{user.location}</Text>
    </View>
  );
}

export default UserInfo;

