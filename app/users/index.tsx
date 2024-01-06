import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';

const index = () => {
    // const [usersUsername, setUsersUsername] = useState<string[]>();
    const [usersSearched, setUsersSearched] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const {loading : loadingUser, error : errorUser, userData, setUserData, fetchUserData} = useFetchUserData();

    let usersUsername : string[] =[];

    useEffect(() => {
        const getUser = async () => {
            const users = await AsyncStorage.getItem('users');
            if(users){
                usersUsername = JSON.parse(users);
                getUsersSearched(usersUsername)
            }
        }
        getUser();
        
    }, []);

    const getUsersSearched = async (users : string []) => {
        setLoading(true)
        users.map(async (user) : Promise<any> => {
            await fetchUserData(user).then((response) => {
                setUsersSearched((prevUsersSearched) => [...prevUsersSearched, response])
            })
        })
        setLoading(false)
    }

    return (
        <View>
            {!loading && usersSearched && usersSearched.map((user) => (
                <View>
                    <Text>{user.login}</Text>
                    <Text>{user.id}</Text>
                    <Text>{user.location}</Text>
                </View>
            ))}

        </View>
    )
}

export default index;