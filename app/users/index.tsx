import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import UserInfo from '../../components/UserInfo/UserInfo';

const index = () => {
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
                <UserInfo user={user}/>
            ))}

        </View>
    )
}

export default index;