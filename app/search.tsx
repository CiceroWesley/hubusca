import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const search = () => {
  
  return (
    <View>
        <Text>BEM VINDO</Text>
        <Link href={{
            pathname: "user/[id]",
            params: {id : '1'}
        }}>
            BUSCAR USUARIO
        </Link>
    </View>
  )
}

export default search;