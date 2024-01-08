import { StatusBar } from 'expo-status-bar';
import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router/src/hooks';
import { A } from '@expo/html-elements';
import { repositoryWrapper } from '../../types/types';

const RepositoryInfo = ({repository} : repositoryWrapper) => {
  const router = useRouter()
  return (
    <View >
      <A href={repository.html_url}>
            <View>
                <Text>{repository.name}</Text>
                <Text>{repository.language}</Text>
                <Text>{repository.description}</Text>
                <Text>{repository.created_at}</Text>
                <Text>{repository.pushed_at}</Text>
            </View>
        </A>
    </View>
  );
}

export default RepositoryInfo;

