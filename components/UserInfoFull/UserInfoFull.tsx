import { StatusBar } from 'expo-status-bar';
import { Pressable, Image, Text, View } from 'react-native';
import { userWrapper } from '../../types/types';
import styled from 'styled-components/native';


const ImageCircle = styled.Image`
  border-radius: 70px;
  width: 200px;
  height: 200px;
`

const UserInfoFull = ({user} : userWrapper) => {
  return (
    <View >
      <ImageCircle source={{uri: user.avatar_url}} />
      <Text>Nome:{user.name ? user.name : 'Não disponível'}</Text>
      <Text>Login:{user.login ? user.login : 'Não disponível'}</Text>
      <Text>Localização:{user.location ? user.location : 'Não disponível'}</Text>
      <Text>Id:{user.id ? user.id : 'Não disponível'}</Text>
      <Text>Seguidores:{user.followers ? user.followers : 'Não disponível'}</Text>
      <Text>Repositórios públicos:{user.public_repos ? user.public_repos : 'Não disponível'}</Text>
    </View>
  );
}

export default UserInfoFull;

