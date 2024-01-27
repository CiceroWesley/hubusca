import { StatusBar } from 'expo-status-bar';
import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router/src/hooks';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';
import { repositoryWrapper } from '../../types/types';
import {styled} from 'styled-components/native'


const WraperRepo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-top: 3px;
`

const RepositoryInfo = ({repository} : repositoryWrapper) => {
  const router = useRouter()
  return (
    <Pressable onPress={() => Linking.openURL(`${repository.html_url}`)}>
      <WraperRepo>
        <Text>Nome do repositório: {repository.name ? repository.name : 'Não disponível'}</Text>
        <Text>Linguagem utilizada: {repository.language ? repository.language : 'Não disponível'}</Text>
        <Text>Descrição: {repository.description ? repository.description : 'Não disponível'}</Text>
        <Text>Data de criação: {repository.created_at ? repository.created_at.split('T')[0] : 'Não disponível'}</Text>
        <Text>Último push: {repository.pushed_at ? repository.pushed_at.split('T')[0] : 'Não disponível'}</Text>
      </WraperRepo>
    </Pressable>
    
  );
}

export default RepositoryInfo;

