import { Pressable, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router/src/hooks';
import { user, userWrapper } from '../../types/types';
import {styled} from 'styled-components/native'

const ImageCircle = styled.Image`
  border-radius: 70px;
  width: 200px;
  height: 200px;
`

const WraperUser = styled.View`
  margin-top: 10px;
`

const UserInfo = ({user} : userWrapper) => {
  const router = useRouter()
  return (
    <WraperUser >
      <Pressable onPress={() => router.push({ pathname: `(tabs)/user/${user.login}`})}>
        <ImageCircle source={{uri: user.avatar_url}} />
      </Pressable>
      <Text>Nome: {user.name ? user.name : 'Não disponível'}</Text>
      <Text>Login: {user.login ? user.login : 'Não disponível'}</Text>
      <Text>Localização: {user.location ? user.location : 'Não disponível'}</Text>
    </WraperUser>
  );
}

export default UserInfo;

