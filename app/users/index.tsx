import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';

const index = () => {
    const [usersUsername, setUsersUsername] = useState<string[]>();
    const [usersSearched, setUsersSearched] = useState<any[]>();
    const {loading, error, fetchUserData} = useFetchUserData();
    useEffect(() => {
        const getUser = async () => {
            const users = await AsyncStorage.getItem('users');
            if(users){
                setUsersUsername(JSON.parse(users));
            }
        }
        getUser();
    }, []);

    if(usersUsername){
        console.log(usersUsername)

    }

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