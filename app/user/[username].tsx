import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const user = () => {
  const { username } = useLocalSearchParams();
  return (
    <View>
        <Text>{username}</Text>
    </View>
  )
}

export default user;