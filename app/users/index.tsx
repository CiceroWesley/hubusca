import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import useFetchUserData from '../../hooks/useFetchUserData';
import UserInfo from '../../components/UserInfo/UserInfo';
import { user } from '../../types/types';

const index = () => {
    const [usersSearched, setUsersSearched] = useState<user[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { fetchUserData} = useFetchUserData();

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
        const responses: user[] = [];
        try {
            for (const username of users) {
                const response = await fetchUserData(username);
                responses.push(response);
            }    
        } catch (error) {
            setError('Erro ao buscar usuários')
            setLoading(false)
            return;
        }
        setUsersSearched(responses);
        setLoading(false)
    }


    return (
        <ScrollView>
            <View>
                {usersSearched ? (
                    usersSearched.map((user) => (
                        <UserInfo user={user}/>
                    ))
                ): (<Text>{error}</Text>)}
            </View>
        </ScrollView>
    )
}

export default index;