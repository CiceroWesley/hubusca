import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



const WrapperFlexCol = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Welcome = styled.Text`
  font-weight: bold;
  font-size: 32px;
  color: purple;
  margin-top: 30%;
`

const WrapperWelcomeImage = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50%;
  
`

const Button = styled.TouchableOpacity`
  background-color: #95f5f0;
  padding: 15px;
  border-radius: 50px;

`

const index = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView>
      <WrapperFlexCol>
            <WrapperWelcomeImage>
              <Welcome>HUBUSCA</Welcome>
              <AntDesign name="github" size={64} color="black" />
            </WrapperWelcomeImage>
            <Button onPress={() => router.push('search')}>
              <AntDesign name="arrowright" size={24} color="black" />
            </Button>
        </WrapperFlexCol>
    </SafeAreaView>
        
  )
}

export default index;