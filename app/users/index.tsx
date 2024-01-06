import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const index = () => {
    const [usersSearched, setUsersSearched] = useState<any[]>();


    useEffect(() => {
        const getUser = async () => {
            const users = await AsyncStorage.getItem('users');
            if(users){
                setUsersSearched(JSON.parse(users));
                console.log(users)
            }
        }
        getUser();
    }, [])

    return (
        <View>
            {usersSearched && usersSearched.map((login) => (
                <View>
                    <Text>{login}</Text>
                </View>
            ))}

        </View>
    )
}

export default index;