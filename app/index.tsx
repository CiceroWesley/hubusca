import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  
  return (
    <SafeAreaView>
        <Stack.Screen
        options={{
          headerShown: false
        }}
        />
        <View>
            <Text>BEM VINDO</Text>
            <Link href="/search">BUSCAR</Link>
            <Link href="/users">LISTA</Link>
        </View>
    </SafeAreaView>
    
  )
}

export default index;